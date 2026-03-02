import { serve } from "https://deno.land/std@0.204.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const unauthorized = () =>
  new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : "";
  if (!token || token !== SUPABASE_SERVICE_ROLE_KEY) {
    return unauthorized();
  }

  const payload = await req.json().catch(() => null);
  const record = payload?.record ?? payload;
  const uploadId = record?.id ?? record?.upload_id;
  const userId = record?.user_id;
  const createdAtRaw = record?.created_at;

  if (!userId || !uploadId) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: providerProfile } = await supabase
    .from("profiles")
    .select("practice_name")
    .eq("id", userId)
    .maybeSingle();

  const { data: adminProfiles, error: adminError } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "Financial_Admin");

  if (adminError || !adminProfiles?.length) {
    return new Response(JSON.stringify({ error: "No financial admins found" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const adminEmails = [];
  for (const admin of adminProfiles) {
    const { data: adminUser } = await supabase.auth.admin.getUserById(admin.id);
    if (adminUser?.user?.email) {
      adminEmails.push(adminUser.user.email);
    }
  }

  if (adminEmails.length === 0) {
    return new Response(
      JSON.stringify({ error: "Financial admin email not found" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const practiceName =
    providerProfile?.practice_name || "A provider practice";
  const createdAt = createdAtRaw
    ? new Date(createdAtRaw).toLocaleString()
    : "just now";

  const subject = "New tax documents uploaded";
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
      <h2>New tax documents uploaded</h2>
      <p><strong>Practice:</strong> ${practiceName}</p>
      <p><strong>Uploaded:</strong> ${createdAt}</p>
      <p>Log in to the Provider Portal to review the submission.</p>
    </div>
  `;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: adminEmails,
      subject,
      html,
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    return new Response(JSON.stringify({ error: errorText }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
