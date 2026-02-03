"use client";

import { Building2, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProviderTopBar() {
  const router = useRouter();
  const supabase = createClient();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/provider");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between px-0 py-3">
        <Link
          href="/provider/app"
          className="flex items-center gap-2 pl-4 text-slate-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              CareFirst
            </p>
            <p className="text-base font-semibold">Provider Dashboard</p>
          </div>
        </Link>
        <div className="relative pr-4" tabIndex={0} onBlur={() => setMenuOpen(false)}>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
          >
            <User className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-lg">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
