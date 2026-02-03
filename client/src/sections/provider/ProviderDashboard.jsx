"use client";

import { ArrowUpRight, CircleCheck, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const actions = [
  {
    title: "Complete tax onboarding",
    description: "Upload practice data for confidential review.",
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

export default function ProviderDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const loadName = async () => {
      const { data } = await supabase.auth.getUser();
      const meta = data?.user?.user_metadata || {};
      const firstName = meta.first_name || "";
      const lastName = meta.last_name || "";
      const fallback = data?.user?.email?.split("@")[0] || "Provider";
      const fullName = `${firstName} ${lastName}`.trim();
      setDisplayName(fullName || fallback);
    };
    loadName();
  }, [supabase]);

  if (!displayName) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Provider Dashboard
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              Welcome, {displayName || "—"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Track onboarding progress, review your token allocation, and
              verify your credentials.
            </p>
          </div>
          <div />
        </div>
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
