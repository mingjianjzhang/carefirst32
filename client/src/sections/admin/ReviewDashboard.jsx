"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, LineChart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const API_BASE =
  process.env.NEXT_PUBLIC_UPLOAD_API_BASE || "http://localhost:3001";

const formatTimestamp = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

const formatSavings = (value) => {
  if (value === null || value === undefined) return "—";
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(parsed);
};

export default function ReviewDashboard({ uploads, onAnalyze }) {
  const router = useRouter();
  const supabase = createClient();
  const [drafts, setDrafts] = useState({});
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const rows = useMemo(() => uploads || [], [uploads]);

  const handleDownload = async (uploadId) => {
    setError("");
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (!token) {
      setError("Please sign in again to download files.");
      return;
    }
    const response = await fetch(`${API_BASE}/api/uploads/${uploadId}/download`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Failed to generate download link.");
      return;
    }
    const { url } = await response.json();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAnalyze = (uploadId) => {
    const value = drafts[uploadId];
    if (!value) {
      setError("Enter a potential savings amount before submitting.");
      return;
    }
    setError("");
    startTransition(async () => {
      await onAnalyze(uploadId, value);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Financial Admin
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              Tax Submission Review
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review uploaded tax documents and publish savings insights.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <LineChart className="h-6 w-6" />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <div className="col-span-4">Practice</div>
          <div className="col-span-2">Uploaded</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Savings</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {rows.length === 0 && (
          <div className="px-6 py-8 text-sm text-slate-500">
            No submissions yet.
          </div>
        )}

        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-12 items-center gap-3 border-b border-slate-100 px-6 py-4 text-sm last:border-b-0"
          >
            <div className="col-span-4">
              <p className="font-semibold text-slate-900">
                {row.practice_name}
              </p>
              <p className="text-xs text-slate-500">{row.filename}</p>
            </div>
            <div className="col-span-2 text-slate-600">
              {formatTimestamp(row.created_at)}
            </div>
            <div className="col-span-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  row.status === "analyzed"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {row.status === "analyzed" ? "Analyzed" : "Pending"}
              </span>
            </div>
            <div className="col-span-2 text-slate-700">
              {formatSavings(row.potential_savings)}
            </div>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleDownload(row.id)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>

            <div className="col-span-12 mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Potential Savings
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={drafts[row.id] || ""}
                onChange={(event) =>
                  setDrafts((prev) => ({
                    ...prev,
                    [row.id]: event.target.value,
                  }))
                }
                placeholder="25000"
                className="w-40 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleAnalyze(row.id)}
                className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Mark Analyzed
              </button>
              {row.analyzed_at && (
                <span className="text-xs text-slate-500">
                  Updated {formatTimestamp(row.analyzed_at)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
