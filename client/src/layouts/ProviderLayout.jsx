"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileSpreadsheet, ShieldCheck } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/provider/app", icon: BarChart3 },
  { label: "Taxes", to: "/provider/app/taxes", icon: FileSpreadsheet },
  { label: "Tokens", to: "/provider/app/tokens", icon: BarChart3 },
  { label: "KYC", to: "/provider/app/kyc", icon: ShieldCheck },
];

const getNavClass = (isActive) =>
  [
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium leading-tight transition",
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
  ].join(" ");

export default function ProviderLayout({ children }) {
  const pathname = usePathname();
  const isActive = (href) =>
    href === "/provider/app" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="grid min-h-[calc(100vh-56px)] gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="min-h-full rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            Provider Portal
          </p>
          <h2 className="mt-2 text-base font-semibold text-slate-900">
            CareFirst Dental
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Secure onboarding and ownership dashboard.
          </p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={getNavClass(active)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          <p className="font-semibold">Status</p>
          <p className="mt-1">Onboarding in progress</p>
        </div>
      </aside>
      <section className="space-y-6 px-6 pb-16 pt-8">
        {children}
      </section>
    </div>
  );
}
