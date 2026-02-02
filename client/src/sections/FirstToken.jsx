"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Crown,
  FileText,
  Gift,
  HandCoins,
  HeartPulse,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import logo from "../assets/logo.png";

const patientSteps = [
  {
    title: "Visit",
    description: "Come in for your appointment and keep your care on track.",
    icon: HeartPulse,
  },
  {
    title: "Earn",
    description: "Get $FIRST automatically in your Rewards account.",
    icon: Gift,
  },
  {
    title: "Redeem",
    description: "Use $FIRST toward copays, whitening, or deductibles.",
    icon: HandCoins,
  },
];

const providerSteps = [
  {
    title: "Tax mitigation",
    description: "Work with Raymond to optimize practice deductions.",
    icon: FileText,
  },
  {
    title: "Hold assets",
    description: "Convert overhead into $FIRST balance in your vault.",
    icon: Crown,
  },
  {
    title: "Spend smarter",
    description: "Use $FIRST for premium supplies and lab services.",
    icon: BriefcaseBusiness,
  },
];

const vendorLogos = [
  "Unismile",
  "CareFirst Lab",
  "Precision Implants",
  "OralTech 3D",
];

export default function FirstToken() {
  const [view, setView] = useState("patients");
  const isPatients = view === "patients";

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-14 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
              CareFirst Rewards
            </p>
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              The New Standard of Dental Value.
            </h1>
            <p className="text-lg text-slate-600">
              Earn rewards for your health, and equity for your practice.
              Powered by secure technology.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -left-6 top-6 h-32 w-32 rounded-full bg-amber-200/40 blur-2xl" />
            <div className="absolute -right-4 bottom-6 h-24 w-24 rounded-full bg-blue-200/40 blur-2xl" />
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
              <Image
                src={logo}
                alt="CareFirst Golden Shield"
                width={192}
                height={192}
                className="rounded-[28px] object-cover shadow-[0_22px_40px_rgba(15,23,42,0.35)]"
                priority
              />
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
              {[
                { id: "patients", label: "For Patients (Smile Rewards)" },
                { id: "providers", label: "For Providers (Practice Equity)" },
              ].map((option) => {
                const isActive = view === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setView(option.id)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      isActive && option.id === "patients"
                        ? "bg-blue-600 text-white"
                        : isActive
                          ? "bg-amber-500 text-white"
                          : "text-slate-600 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {isPatients ? (
            <div className="mt-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Smile Miles
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                    Rewards that feel like premium membership miles.
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    $FIRST is your CareFirst rewards balance, ready to offset
                    future care.
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 md:flex">
                  <BadgeCheck className="h-4 w-4" />
                  Member rewards enabled
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {patientSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Earn 500 more $FIRST for a free cleaning
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Your Rewards account updates automatically after each
                      visit.
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    1,500 / 2,000 $FIRST
                  </div>
                </div>
                <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Supply chain rebates
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  Turn your overhead into assets.
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  $FIRST helps practices capture value from the CareFirst supply
                  network.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {providerSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Ecosystem loop
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Earn, hold, and spend $FIRST with trusted partners.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Building2 className="h-4 w-4" />
                    Provider network
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Step 1
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      Tax mitigation with Raymond
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Step 2
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      Hold $FIRST in your vault
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Step 3
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      Spend on premium supplies
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Accepted by leading vendors
                  </h3>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    Preferred partners
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {vendorLogos.map((vendor) => (
                    <div
                      key={vendor}
                      className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm font-semibold text-slate-500"
                    >
                      {vendor}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
              Live value
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              100 $FIRST = $10.50 USD
            </p>
            <p className="mt-2 text-sm text-slate-600">Network Value</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-900">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-semibold">Compliance shield</p>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Operated by CareFirst Foundation (Delaware). $FIRST is a utility
              token, not a security or investment vehicle.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-900">
              <WalletCards className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-semibold">FAQ</p>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              What happens if I lose my phone?
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Your Rewards account is recoverable in the CareFirst app, so you
              never lose your balance.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-amber-500" />
            <span>Rewards balances are always displayed in USD value.</span>
          </div>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Premium membership program
          </span>
        </div>
      </section>
    </div>
  );
}
