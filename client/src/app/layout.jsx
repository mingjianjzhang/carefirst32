import "./globals.css";
import Script from "next/script";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar.jsx";

export const metadata = {
  title: "CareFirst Dental",
  description: "CareFirst Dental provider and patient portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={logo.src} />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Script id="chatbase-init" strategy="beforeInteractive">
          {`window.chatbase = window.chatbase || function() {(window.chatbase.q = window.chatbase.q || []).push(arguments)};`}
        </Script>
        <Script
          id="FqjESDyExlB5x3IS6LrJM"
          src="https://www.chatbase.co/embed.min.js"
          data-domain="www.chatbase.co"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
