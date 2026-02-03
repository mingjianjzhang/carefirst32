"use client";

import { FileUp, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];

export default function UploadDropzone() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const addFiles = (fileList) => {
    const next = Array.from(fileList || []);
    const valid = next.filter((file) => ACCEPTED_TYPES.includes(file.type));
    if (valid.length !== next.length) {
      setError("Only PDF, XLS, XLSX, or CSV files are supported.");
    } else {
      setError("");
    }
    setFiles((prev) => [...prev, ...valid]);
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
            {files.map((file) => (
              <li
                key={`${file.name}-${file.size}`}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Ready
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
