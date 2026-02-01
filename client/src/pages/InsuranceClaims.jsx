import { FileCheck, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    title: "One-Click Submission",
    description:
      "Patients or providers submit claims directly through the app. The system automatically verifies the procedure against the policy.",
    icon: FileCheck,
  },
  {
    title: "Privacy-First Verification",
    description:
      "Using Zero-Knowledge Proofs (ZKP), we prove the validity of a claim to insurers without exposing unnecessary patient personal data.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Payouts",
    description:
      "Once the Smart Contract verifies the treatment data against the policy rules, funds are released instantly.",
    icon: Zap,
  },
];

export default function InsuranceClaims() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-14 shadow-sm">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
            Insurance Claims
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Smart Claims. Zero Friction. Instant Settlement.
          </h1>
          <p className="text-lg text-slate-600">
            Say goodbye to weeks of waiting and paperwork. CareFirst Insurance
            utilizes Smart Contracts to automate the adjudication process,
            turning claims verification from a manual burden into a millisecond
            calculation.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
