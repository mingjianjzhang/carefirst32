"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar.jsx";
import ProviderTopBar from "./ProviderTopBar.jsx";

export default function HeaderSwitch() {
  const pathname = usePathname();
  const isProviderApp = pathname.startsWith("/provider/app");

  return isProviderApp ? <ProviderTopBar /> : <Navbar />;
}
