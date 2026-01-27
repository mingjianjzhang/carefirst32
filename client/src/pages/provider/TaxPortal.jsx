import { FileUp, Lock } from "lucide-react";

export default function TaxPortal() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          The Hook
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Tax onboarding for Raymond
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Share your practice financials securely so Raymond can prepare your
          filings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
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

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <FileUp className="mx-auto h-8 w-8 text-blue-600" />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Upload previous tax returns
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Drag and drop files or click to browse. PDF, XLS, or CSV.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
            >
              Choose files
            </button>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Lock className="h-4 w-4" />
            Submit to Raymond
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Secure upload
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Files are encrypted and shared only with your assigned accountant.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-sm text-emerald-700">
            <p className="font-semibold">Raymond is standing by</p>
            <p className="mt-1">
              Expected review within 24 business hours.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
