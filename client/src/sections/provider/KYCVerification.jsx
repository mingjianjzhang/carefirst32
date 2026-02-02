import { CloudUpload, ShieldCheck, Stamp } from "lucide-react";

const steps = [
  { label: "License verification", status: "Pending review" },
  { label: "Identity verification", status: "Unverified" },
];

export default function KYCVerification() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Verification
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          KYC & licensure validation
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Upload credentials so we can confirm your identity and dental
          license.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Upload verification documents
              </h2>
              <p className="text-sm text-slate-600">
                Files are stored securely and reviewed by compliance.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {["Dental License ID", "State ID"].map((label) => (
              <div
                key={label}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center"
              >
                <CloudUpload className="mx-auto h-7 w-7 text-blue-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {label}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Drag and drop or click to upload
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  Select file
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Status</p>
              <Stamp className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <div
                  key={step.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-600">{step.label}</span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-sm text-emerald-700">
            <p className="font-semibold">Estimated review</p>
            <p className="mt-1">1-2 business days after submission.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
