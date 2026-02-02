import { Globe, KeyRound, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Global Health Passport",
    description:
      "Carry your complete dental history (X-rays, scans, treatment logs) across borders without relying on a single clinic's server.",
    icon: Globe,
  },
  {
    title: "Digital Asset Storage",
    description:
      'View the "Digital Birth Certificate" (NFT) of your implants, verifying their brand, manufacturing date, and authenticity.',
    icon: ShieldCheck,
  },
  {
    title: "Selective Sharing",
    description:
      "You hold the private keys. Grant doctors temporary access to your records with a single click and revoke it just as easily.",
    icon: KeyRound,
  },
];

export default function PatientWallet() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-14 shadow-sm">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
            Patient Wallet
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Your Dental Identity, Encrypted & Portable.
          </h1>
          <p className="text-lg text-slate-600">
            The CareFirst Wallet is your secure digital vault. It stores your
            medical records, implant IDs (NFTs), and insurance data in one
            place—accessible only by you, anywhere in the world.
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
