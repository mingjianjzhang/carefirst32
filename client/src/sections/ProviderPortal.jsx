import {
  ArrowRight,
  BadgeCheck,
  Globe,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    title: "Multi-Specialty Support",
    description:
      "Covers all 11 dental specialties, from General Dentistry to Oral & Maxillofacial Surgery.",
    icon: Stethoscope,
  },
  {
    title: "Cross-Border Care",
    description:
      "Serve dental tourism patients with instant access to verified historical records.",
    icon: Globe,
  },
  {
    title: "Risk Mitigation",
    description:
      "Reduce medical disputes through AI-assisted diagnostics and immutable verification.",
    icon: ShieldCheck,
  },
];

export default function ProviderPortal() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-14 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
              Provider Portal
            </p>
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              Join the Network of Verified Care.
            </h1>
            <p className="text-lg text-slate-600">
              Eliminate clinical guesswork with instant access to immutable,
              global patient records across all 11 specialties. Protect your
              practice with blockchain-verified data that validates implant
              authenticity and significantly reduces liability risks.
            </p>
            <Link
              href="/provider/app"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Log in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -left-6 top-6 h-32 w-32 rounded-full bg-blue-200/40 blur-2xl" />
            <div className="absolute -right-4 bottom-6 h-24 w-24 rounded-full bg-emerald-200/40 blur-2xl" />
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-xl">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md">
                <BadgeCheck className="h-14 w-14 text-blue-600" />
              </div>
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
                Secure access
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Web2.5 Onboarding
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Start with familiar steps, then connect your digital signature.
            </h2>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 md:flex">
            <BadgeCheck className="h-4 w-4" />
            Verified access flow
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step 1
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              Enter basic information
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Stored in the Web2 database for immediate access and support.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="text-xs font-semibold text-slate-600">
                Name
                <input
                  type="text"
                  placeholder="Dr. Jordan Rivers"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>
              <label className="text-xs font-semibold text-slate-600">
                Specialty
                <input
                  type="text"
                  placeholder="General Dentistry"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>
              <label className="text-xs font-semibold text-slate-600">
                License No.
                <input
                  type="text"
                  placeholder="D-482019"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Step 2
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              Create or connect a crypto wallet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Acts as your future digital signature tool for verified records.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Connect wallet
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
