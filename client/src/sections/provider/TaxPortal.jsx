import { FileSpreadsheet, Lock } from "lucide-react";
import UploadDropzone from "@/components/UploadDropzone";

export default function TaxPortal() {
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
            <UploadDropzone />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
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
