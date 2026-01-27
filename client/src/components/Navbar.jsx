import { Link, NavLink } from "react-router-dom";
import { Building2, ShieldCheck } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  [
    "text-sm font-medium transition-colors",
    isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-slate-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              CareFirst
            </p>
            <p className="text-base font-semibold">Dental Network</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/provider" className={navLinkClass}>
            Provider Portal
          </NavLink>
        </nav>
        <Link
          to="/provider"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <ShieldCheck className="h-4 w-4" />
          Provider Login
        </Link>
      </div>
    </header>
  );
}
