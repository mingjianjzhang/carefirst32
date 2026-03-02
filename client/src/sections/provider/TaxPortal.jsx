 "use client";

import { FileSpreadsheet, Lock } from "lucide-react";
import UploadDropzone from "@/components/UploadDropzone";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TaxPortal() {
  const uploadRef = useRef(null);
  const supabase = createClient();
  const [latestUpload, setLatestUpload] = useState(null);
  const [statusError, setStatusError] = useState("");

  const loadLatestUpload = async () => {
    setStatusError("");
    const { data, error } = await supabase
      .from("tax_uploads")
      .select("status, potential_savings, analyzed_at, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      setStatusError("Unable to load upload status.");
      return;
    }
    setLatestUpload(data || null);
  };

  useEffect(() => {
    loadLatestUpload();
  }, []);
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Reclaim Your Practice Capital
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Securely submit your tax documents for a confidential review to start
          earning back what you paid in taxes.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Submission Status
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                {latestUpload?.status === "analyzed"
                  ? "Savings Identified"
                  : "Review in Progress"}
              </h2>
            </div>
            <button
              type="button"
              onClick={loadLatestUpload}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
            >
              Refresh
            </button>
          </div>

          {statusError && (
            <p className="mt-3 text-sm text-red-600">{statusError}</p>
          )}

          {!statusError && !latestUpload && (
            <p className="mt-3 text-sm text-slate-600">
              No submissions yet. Upload your tax documents to start.
            </p>
          )}

          {latestUpload && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <p>
                Uploaded:{" "}
                <span className="font-semibold text-slate-900">
                  {new Date(latestUpload.created_at).toLocaleString()}
                </span>
              </p>
              {latestUpload.status === "analyzed" ? (
                <p className="mt-2">
                  Potential savings:{" "}
                  <span className="font-semibold text-emerald-600">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(Number(latestUpload.potential_savings || 0))}
                  </span>
                </p>
              ) : (
                <p className="mt-2">
                  Our team is reviewing your documents now.
                </p>
              )}
            </div>
          )}
        </div>
        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Practice name
              <input
                type="text"
                placeholder="CareFirst Dental Studio"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              EIN
              <input
                type="text"
                placeholder="12-3456789"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Annual revenue
              <input
                type="text"
                placeholder="$850,000"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Primary contact email
              <input
                type="email"
                placeholder="doctor@practice.com"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          <div className="mt-6">
            <UploadDropzone ref={uploadRef} />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => uploadRef.current?.startUpload()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
            >
              <Lock className="h-4 w-4" />
              Calculate My Savings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
