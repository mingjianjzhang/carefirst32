import { Activity, Headset, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI Diagnostics",
    description:
      "Advanced algorithms review your stored X-rays and scans to flag potential risks before they become painful problems.",
    icon: Sparkles,
  },
  {
    title: "Implant Health Tracking",
    description:
      "Receive personalized maintenance reminders based on the specific warranty and care guidelines of your specific implant model.",
    icon: Activity,
  },
  {
    title: "Tele-Dentistry Access",
    description:
      "Connect instantly with verified CareFirst providers for remote consultations or emergency triage.",
    icon: Headset,
  },
];

export default function ICare() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-14 shadow-sm">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
            iCare
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            iCare: Intelligent Prevention & Virtual Support.
          </h1>
          <p className="text-lg text-slate-600">
            iCare is your 24/7 dental health assistant. Powered by AI, it
            analyzes your records to provide personalized preventive advice,
            tracks the longevity of your treatments, and connects you with
            specialists when you need them most.
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
