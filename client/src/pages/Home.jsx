import { ArrowRight, ShieldCheck, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Tax-ready onboarding",
    description:
      "Submit the information your accountant needs in a secure, streamlined workflow.",
    icon: ShieldCheck,
  },
  {
    title: "Provider ownership",
    description:
      "Visualize equity participation and projected token growth over time.",
    icon: Wallet,
  },
  {
    title: "KYC verification",
    description:
      "Verify licensure and identity with a guided, compliant upload process.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-16 shadow-sm">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
            CareFirst Dental Network
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            A trusted bridge between traditional care and digital ownership.
          </h1>
          <p className="text-lg text-slate-600">
            CareFirst helps providers onboard faster, unlock tokenized equity,
            and complete verification in one secure portal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/provider"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Enter Provider Portal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
              Request a demo
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
