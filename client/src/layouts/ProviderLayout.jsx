import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, FileSpreadsheet, ShieldCheck } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/provider", icon: BarChart3 },
  { label: "Taxes", to: "/provider/taxes", icon: FileSpreadsheet },
  { label: "Tokens", to: "/provider/tokens", icon: BarChart3 },
  { label: "KYC", to: "/provider/kyc", icon: ShieldCheck },
];

const navLinkClass = ({ isActive }) =>
  [
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
  ].join(" ");

export default function ProviderLayout() {
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Provider Portal
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            CareFirst Dental
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Secure onboarding and ownership dashboard.
          </p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end>
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-8 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
          <p className="font-semibold">Status</p>
          <p className="mt-1">Onboarding in progress</p>
        </div>
      </aside>
      <section className="space-y-6">
        <Outlet />
      </section>
    </div>
  );
}
