"use client";
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { Card, PageHeader, StatCard } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { labourGroups as seed } from "@/data/demo";
import { Users, UserCheck, UserX, Wallet } from "lucide-react";

export default function Labour() {
  const { toast } = useApp();
  const [groups, setGroups] = useState(seed.map((g) => ({ ...g })));
  const total = groups.reduce((a, g) => a + g.count, 0);
  const present = groups.reduce((a, g) => a + g.present, 0);
  function toggle(i: number, d: number) {
    setGroups(groups.map((g, j) => j === i ? { ...g, present: Math.min(g.count, Math.max(0, g.present + d)) } : g));
  }
  return (
    <Shell>
      <PageHeader title="Labour" sub="Attendance + daily cost — demo interactions stored locally." />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Total Workers" value={String(total)} icon={<Users size={16} />} />
        <StatCard label="Present Today" value={String(present)} icon={<UserCheck size={16} />} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Absent" value={String(total - present)} icon={<UserX size={16} />} accent="bg-red-50 text-red-600" />
        <StatCard label="Daily Labour Cost" value="₹38,400" sub="Demo estimate" icon={<Wallet size={16} />} accent="bg-amber-50 text-amber-600" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((g, i) => (
          <Card key={g.name} className="card-hover">
            <div className="flex items-center justify-between"><p className="font-bold">{g.name}</p><p className="text-xs text-slate-500">{g.present}/{g.count} present</p></div>
            <div className="mt-2 h-2 rounded-full bg-slate-100"><div className="progress-anim h-full rounded-full bg-emerald-500" style={{ width: `${(g.present / g.count) * 100}%` }} /></div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => toggle(i, -1)} className="flex-1 rounded-xl bg-slate-100 py-1.5 text-xs font-bold hover:bg-slate-200">− Absent</button>
              <button onClick={() => { toggle(i, 1); }} className="flex-1 rounded-xl bg-slate-900 py-1.5 text-xs font-bold text-white">+ Present</button>
              <button onClick={() => toast("Contractor pinged", `${g.name} — demo`)} className="flex-1 rounded-xl bg-orange-100 py-1.5 text-xs font-bold text-orange-700">Ping</button>
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
