"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";

const getNavClass = (isActive) =>
  [
    "text-sm font-medium transition-colors",
    isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900",
  ].join(" ");

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-slate-900">
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
          <Link href="/" className={getNavClass(isActive("/"))}>
            Home
          </Link>
          <Link href="/first" className={getNavClass(isActive("/first"))}>
            $FIRST Rewards
          </Link>
          <Link href="/wallet" className={getNavClass(isActive("/wallet"))}>
            Patient Wallet
          </Link>
          <Link
            href="/marketplace"
            className={getNavClass(isActive("/marketplace"))}
          >
            Marketplace
          </Link>
          <Link href="/claims" className={getNavClass(isActive("/claims"))}>
            Insurance Claims
          </Link>
          <Link href="/icare" className={getNavClass(isActive("/icare"))}>
            iCare
          </Link>
          <Link href="/provider" className={getNavClass(isActive("/provider"))}>
            Provider Portal
          </Link>
        </nav>
      </div>
    </header>
  );
}
