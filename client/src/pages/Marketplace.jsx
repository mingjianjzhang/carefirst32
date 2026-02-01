import { Box, Factory, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Direct-to-Source",
    description:
      "Clinics purchase supplies directly from manufacturers via smart contracts, ensuring competitive pricing and zero counterfeit risk.",
    icon: Factory,
  },
  {
    title: "Automated Restocking",
    description:
      "Integrated inventory management detects when an implant is used and automatically triggers a reorder from the factory.",
    icon: Box,
  },
  {
    title: "Lab Certification",
    description:
      "Browse and partner with dental labs whose craftsmanship is cryptographically signed and verified on the blockchain.",
    icon: ShieldCheck,
  },
];

export default function Marketplace() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-14 shadow-sm">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
            Marketplace
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            A Verified Supply Chain for Authentic Care.
          </h1>
          <p className="text-lg text-slate-600">
            The CareFirst Marketplace connects clinics directly with certified
            manufacturers and labs. By removing opaque middlemen, we ensure that
            every material entering the patient’s mouth is genuine, traceable,
            and fairly priced.
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
