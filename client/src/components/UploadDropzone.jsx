"use client";

import { FileUp, ShieldCheck } from "lucide-react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];
const API_BASE =
  process.env.NEXT_PUBLIC_UPLOAD_API_BASE || "http://localhost:3001";

const UploadDropzone = forwardRef(function UploadDropzone(_props, ref) {
  const inputRef = useRef(null);
  const supabase = createClient();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const updateFile = (id, updates) => {
    setFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const uploadFile = async (fileItem) => {
    updateFile(fileItem.id, { status: "uploading", error: "" });
    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      if (!token) {
        updateFile(fileItem.id, {
          status: "error",
          error: "Please sign in again to upload files.",
        });
        return;
      }

      const presignResponse = await fetch(`${API_BASE}/api/uploads/presign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: fileItem.file.name,
          contentType: fileItem.file.type,
        }),
      });

      if (!presignResponse.ok) {
        const payload = await presignResponse.json().catch(() => null);
        throw new Error(payload?.error || "Failed to request upload URL.");
      }

      const { uploadId, url, key, sse } = await presignResponse.json();
      const uploadHeaders = {
        "Content-Type": fileItem.file.type,
      };
      if (sse?.algorithm) {
        uploadHeaders["x-amz-server-side-encryption"] = sse.algorithm;
      }
      if (sse?.kmsKeyId) {
        uploadHeaders["x-amz-server-side-encryption-aws-kms-key-id"] =
          sse.kmsKeyId;
      }

      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: uploadHeaders,
        body: fileItem.file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to storage.");
      }

      updateFile(fileItem.id, {
        status: "uploaded",
        uploadId,
        key,
      });
    } catch (err) {
      updateFile(fileItem.id, {
        status: "error",
        error: err?.message || "Upload failed.",
      });
    }
  };

  const startUpload = () => {
    const pending = files.filter(
      (item) => item.status === "queued" || item.status === "error"
    );
    if (pending.length === 0) {
      setError("Add a file before uploading.");
      return;
    }
    setError("");
    pending.forEach((item) => uploadFile(item));
  };

  useImperativeHandle(ref, () => ({ startUpload }), [files]);

  const addFiles = (fileList) => {
    const next = Array.from(fileList || []);
    const valid = next.filter((file) => ACCEPTED_TYPES.includes(file.type));
    if (valid.length !== next.length) {
      setError("Only PDF, XLS, XLSX, or CSV files are supported.");
    } else {
      setError("");
    }
    const pending = valid.map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: "queued",
      error: "",
      uploadId: null,
      key: null,
    }));
    setFiles((prev) => [...prev, ...pending]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_24px_rgba(15,23,42,0.08)]"
      >
        <FileUp className="mx-auto h-8 w-8 text-blue-600" />
        <p className="mt-3 text-sm font-semibold text-slate-900">
          Drag & drop tax documents
        </p>
        <p className="mt-1 text-xs text-slate-500">
          PDF, XLS, XLSX, or CSV. Up to 50 MB per file.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
        >
          Choose files
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.xls,.xlsx,.csv"
          className="hidden"
          onChange={(event) => addFiles(event.target.files)}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {files.length > 0 && (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Uploaded files
          </div>
          <ul className="space-y-2">
            {files.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {item.error && (
                    <p className="mt-1 text-xs text-red-600">{item.error}</p>
                  )}
                </div>
                {item.status === "queued" && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                    Queued
                  </span>
                )}
                {item.status === "uploading" && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    Uploading
                  </span>
                )}
                {item.status === "uploaded" && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Uploaded
                  </span>
                )}
                {item.status === "error" && (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    Failed
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default UploadDropzone;
