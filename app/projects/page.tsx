"use client";
import { useRouter } from "next/navigation";
import { Eye, Plus } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, PageHeader, StatCard } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { projects } from "@/data/demo";
import { inr } from "@/lib/format";
import { IndianRupee, HardHat, Wallet, TrendingUp } from "lucide-react";

export default function Projects() {
  const { toast } = useApp();
  const router = useRouter();
  return (
    <Shell>
      <PageHeader title="Projects" sub="Project value, progress, paid, pending, timeline."
        actions={<Button onClick={() => toast("New project draft created", "Demo — starts from a won lead")}><Plus size={15} /> New Project</Button>} />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Project Value" value="₹2.84 Cr" icon={<IndianRupee size={16} />} />
        <StatCard label="Active" value="8 projects" icon={<HardHat size={16} />} accent="bg-slate-900 text-white" />
        <StatCard label="Received" value="₹1.74 Cr" icon={<Wallet size={16} />} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Pending" value="₹1.10 Cr" icon={<TrendingUp size={16} />} accent="bg-amber-50 text-amber-600" />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.id} className="card-hover">
            <div className="flex items-start justify-between">
              <div><p className="font-bold">{p.name}</p><p className="text-xs text-slate-500">{p.type} · {p.location} · {p.customer}</p></div>
              <Badge tone={p.progress > 60 ? "green" : "amber"}>{p.status}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs min-[480px]:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-2"><p className="text-slate-400">Value</p><p className="font-extrabold">{inr(p.value)}</p></div>
              <div className="rounded-xl bg-slate-50 p-2"><p className="text-slate-400">Progress</p><p className="font-extrabold">{p.progress}%</p></div>
              <div className="rounded-xl bg-emerald-50 p-2"><p className="text-emerald-600">Paid</p><p className="font-extrabold">{inr(p.received)}</p></div>
              <div className="rounded-xl bg-amber-50 p-2"><p className="text-amber-600">Pending</p><p className="font-extrabold">{inr(p.pending)}</p></div>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="progress-anim h-full rounded-full bg-orange-500" style={{ width: `${p.progress}%` }} /></div>
            <Button variant="secondary" className="mt-3 w-full !text-xs" onClick={() => router.push(`/projects/${p.slug}`)}><Eye size={13} /> Open Project</Button>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
