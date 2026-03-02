const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabaseAuthClient = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey
);

const getSupabaseAuthedClient = (accessToken) => {
  const key = supabaseAnonKey || supabaseServiceRoleKey;
  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
};

const getUserRole = async (supabaseClient, userId) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  if (error) {
    return { role: null, error };
  }
  return { role: data?.role || null, error: null };
};

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  const { data, error } = await supabaseAuthClient.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ error: "Invalid auth token" });
  }

  req.user = data.user;
  req.supabaseAccessToken = token;
  return next();
};

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/uploads/presign", authMiddleware, async (req, res) => {
  const { filename, contentType } = req.body;
  if (!filename || !contentType) {
    return res.status(400).json({ error: "Missing filename or contentType" });
  }

  const uploadId = crypto.randomUUID();
  const key = `tax-uploads/${req.user.id}/${uploadId}-${filename}`;
  const sseKmsKey = process.env.AWS_KMS_KEY_ID;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
    ServerSideEncryption: sseKmsKey ? "aws:kms" : "AES256",
    SSEKMSKeyId: sseKmsKey || undefined,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

  const supabaseAuthed = getSupabaseAuthedClient(req.supabaseAccessToken);
  const { error } = await supabaseAuthed.from("tax_uploads").insert({
    id: uploadId,
    user_id: req.user.id,
    filename,
    content_type: contentType,
    s3_key: key,
    status: "pending",
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({
    uploadId,
    key,
    url,
    sse: sseKmsKey
      ? {
          algorithm: "aws:kms",
          kmsKeyId: sseKmsKey,
        }
      : {
          algorithm: "AES256",
        },
  });
});

app.get("/api/uploads/:id", authMiddleware, async (req, res) => {
  const supabaseAuthed = getSupabaseAuthedClient(req.supabaseAccessToken);
  const { data, error } = await supabaseAuthed
    .from("tax_uploads")
    .select("*")
    .eq("id", req.params.id)
    .eq("user_id", req.user.id)
    .maybeSingle();


  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json({ upload: data });
});

app.get("/api/uploads/:id/download", authMiddleware, async (req, res) => {
  const supabaseAuthed = getSupabaseAuthedClient(req.supabaseAccessToken);
  const { role, error: roleError } = await getUserRole(
    supabaseAuthed,
    req.user.id
  );
  if (roleError) {
    return res.status(400).json({ error: roleError.message });
  }

  let query = supabaseAuthed
    .from("tax_uploads")
    .select("s3_key, user_id")
    .eq("id", req.params.id)
    .maybeSingle();

  if (role !== "Financial_Admin") {
    query = query.eq("user_id", req.user.id);
  }

  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (!data) {
    return res.status(404).json({ error: "Not found" });
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: data.s3_key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });
  return res.json({ url });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
