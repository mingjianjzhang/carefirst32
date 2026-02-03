"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isProviderApp = pathname.startsWith("/provider/app");

  if (isProviderApp) {
    return <main className="w-full">{children}</main>;
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}
