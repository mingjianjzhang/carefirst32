import "./globals.css";
import Navbar from "../components/Navbar.jsx";

export const metadata = {
  title: "CareFirst Dental",
  description: "CareFirst Dental provider and patient portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
