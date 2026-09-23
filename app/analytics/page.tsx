"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { Shell, FlowStrip } from "@/components/layout/Shell";
import { Card, PageHeader, StatCard } from "@/components/ui/ui";
import { monthly, DEMO_NOTICE } from "@/data/demo";

export default function Analytics() {
  return (
    <Shell>
      <FlowStrip />
      <PageHeader title="Analytics" sub={`${DEMO_NOTICE} Fictional metrics for demo.`} />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Monthly Leads" value="24" sub="Sep (demo)" />
        <StatCard label="Estimates" value="14" sub="Sep (demo)" />
        <StatCard label="Quotations" value="8" sub="Sep (demo)" />
        <StatCard label="Projects Won" value="3" sub="Sep (demo)" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card><h3 className="mb-2 font-bold">Leads → Estimates → Quotations → Won</h3>
          <div className="h-64"><ResponsiveContainer><BarChart data={monthly}><XAxis dataKey="m" fontSize={11} /><YAxis fontSize={11} /><Tooltip />
            <Bar dataKey="leads" fill="#0f172a" radius={[5, 5, 0, 0]} /><Bar dataKey="estimates" fill="#f97316" radius={[5, 5, 0, 0]} /><Bar dataKey="quotations" fill="#38bdf8" radius={[5, 5, 0, 0]} /><Bar dataKey="won" fill="#10b981" radius={[5, 5, 0, 0]} />
          </BarChart></ResponsiveContainer></div></Card>
        <Card><h3 className="mb-2 font-bold">Revenue Trend (₹ Lakh, demo)</h3>
          <div className="h-64"><ResponsiveContainer><LineChart data={monthly}><CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" /><XAxis dataKey="m" fontSize={11} /><YAxis fontSize={11} /><Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} dot={false} />
          </LineChart></ResponsiveContainer></div></Card>
        <Card><h3 className="mb-2 font-bold">Pending Payments (₹ Lakh, demo)</h3>
          <div className="h-56"><ResponsiveContainer><BarChart data={monthly.map((m) => ({ m: m.m, pending: Math.round(m.revenue * 0.4) }))}><XAxis dataKey="m" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Bar dataKey="pending" fill="#f59e0b" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></Card>
        <Card><h3 className="mb-2 font-bold">Material Cost Index (demo)</h3>
          <div className="h-56"><ResponsiveContainer><LineChart data={monthly.map((m, i) => ({ m: m.m, cost: 100 + i * 2.4 }))}><XAxis dataKey="m" fontSize={11} /><YAxis fontSize={11} domain={[95, 120]} /><Tooltip /><Line type="monotone" dataKey="cost" stroke="#0f172a" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div>
          <p className="mt-1 text-[11px] text-slate-400">Steel ₹68→₹72/kg scenario lifts a 7.8-ton project by ≈₹31,200 (demo calc).</p></Card>
      </div>
    </Shell>
  );
}
