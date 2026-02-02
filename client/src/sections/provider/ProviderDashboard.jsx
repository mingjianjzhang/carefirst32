import { ArrowUpRight, CircleCheck, FileSpreadsheet, ShieldCheck } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Complete tax onboarding",
    description: "Upload practice data for Raymond, our accountant.",
    to: "/provider/app/taxes",
    icon: FileSpreadsheet,
  },
  {
    title: "Review token allocation",
    description: "Confirm equity vesting and growth projections.",
    to: "/provider/app/tokens",
    icon: ArrowUpRight,
  },
  {
    title: "Submit KYC documents",
    description: "Verify license and identity in one step.",
    to: "/provider/app/kyc",
    icon: ShieldCheck,
  },
];

const statusItems = [
  { label: "Tax onboarding", status: "In progress", tone: "text-blue-600" },
  { label: "Token allocation", status: "Ready", tone: "text-emerald-600" },
  { label: "KYC verification", status: "Pending", tone: "text-amber-600" },
];

export default function ProviderDashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Provider Dashboard
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          Welcome, Dr. Rivers
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Track onboarding progress, review your token allocation, and verify
          your credentials.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className={`mt-3 text-xl font-semibold ${item.tone}`}>
              {item.status}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recommended next steps
          </h2>
          <CircleCheck className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.to}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {action.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {action.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-blue-600">
                  Continue →
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
