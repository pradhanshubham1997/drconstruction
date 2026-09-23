"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Send } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button, Card, PageHeader, StatCard } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { monthly } from "@/data/demo";

export default function Finance() {
  const { toast } = useApp();
  const [got, setGot] = useState(false);
  const pie = [{ n: "Received", v: 174 }, { n: "Pending", v: 110 }];
  return (
    <Shell>
      <PageHeader title="Finance" sub="Revenue, expenses, pending payments, profitability — demo data." actions={<Button onClick={() => { setGot(true); toast("₹5.24L recorded", "Sharma Residence — Electrical"); }}><Send size={15} /> Record Payment</Button>} />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Project Value" value="₹2.84 Cr" />
        <StatCard label="Received" value="₹1.74 Cr" accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Pending" value="₹1.10 Cr" accent="bg-amber-50 text-amber-600" />
        <StatCard label="Expenses" value="₹1.42 Cr" accent="bg-red-50 text-red-600" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2"><h3 className="mb-2 font-bold">Revenue vs Expenses (₹ Lakh)</h3>
          <div className="h-64"><ResponsiveContainer><BarChart data={monthly.map((m) => ({ ...m, exp: Math.round(m.revenue * 0.72) }))}>
            <XAxis dataKey="m" fontSize={11} /><YAxis fontSize={11} /><Tooltip />
            <Bar dataKey="revenue" fill="#ea580c" radius={[6, 6, 0, 0]} name="Revenue" /><Bar dataKey="exp" fill="#0f172a" radius={[6, 6, 0, 0]} name="Expenses" />
          </BarChart></ResponsiveContainer></div>
        </Card>
        <Card><h3 className="mb-2 font-bold">Collection Split</h3>
          <div className="h-64"><ResponsiveContainer><PieChart><Pie data={pie} dataKey="v" nameKey="n" innerRadius={55} outerRadius={85} paddingAngle={3}>
            {[ "#10b981", "#f59e0b"].map((c, i) => <Cell key={i} fill={c} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
          <p className="text-center text-xs text-slate-500">61% collected · 39% pending {got && "· +₹5.24L just recorded (demo)"}</p>
        </Card>
      </div>
      <Card className="mt-4"><h3 className="mb-2 font-bold">Pending Payments</h3>
        {[["Sharma Residence — Electrical", "₹5.24L"], ["Verma Residence — Structure", "₹7.64L"], ["Patel Residence — Finishing", "₹6.78L"]].map(([t, a]) => (
            <div key={t} className="flex flex-wrap items-center justify-between gap-2 border-b py-2.5 text-sm last:border-0">
            <span className="font-medium">{t}</span><span className="flex items-center gap-2 font-extrabold">{a}
              <button onClick={() => toast("Reminder sent", t)} className="rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white">Remind</button></span>
          </div>
        ))}
      </Card>
    </Shell>
  );
}
