import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BadgeDollarSign, Coins, TrendingUp } from "lucide-react";

const growthData = [
  { name: "Q1", value: 35 },
  { name: "Q2", value: 50 },
  { name: "Q3", value: 68 },
  { name: "Q4", value: 92 },
];

const stats = [
  {
    label: "Total equity value",
    value: "$128,400",
    change: "+18% projected",
    icon: BadgeDollarSign,
  },
  {
    label: "Tokens vested",
    value: "32,500 CFT",
    change: "12% unlocked",
    icon: Coins,
  },
  {
    label: "Next milestone",
    value: "Q4 2026",
    change: "Growth curve tracking",
    icon: TrendingUp,
  },
];

export default function TokenDashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          The Lock
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          CareFirst Token dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Your ownership stake grows as your practice delivers care through the
          network.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-emerald-600">{item.change}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Projected token growth
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Estimates based on current network participation.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            +24% YoY
          </span>
        </div>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  borderColor: "#e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
