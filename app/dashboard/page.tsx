"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight, CalendarCheck, FileText, IndianRupee, MapPin, Package,
  Phone, Plus, RefreshCw, Users, MessageCircle, Wallet, HardHat, Eye,
} from "lucide-react";
import { Shell, FlowStrip } from "@/components/layout/Shell";
import { Badge, Button, Card, StatCard } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { activity, projects } from "@/data/demo";
import { inr, inrFull } from "@/lib/format";

const PIPELINE = [
  { label: "New Lead", count: 24 }, { label: "Site Visit", count: 11 },
  { label: "Estimate", count: 8 }, { label: "Quotation", count: 6 },
  { label: "Negotiation", count: 3 }, { label: "Won", count: 3 },
];

export default function Dashboard() {
  const { toast } = useApp();
  const router = useRouter();
  const wa = (t: string, d?: string) => toast(t, d ?? "WhatsApp preview opened (demo — no message sent)");

  const actions = [
    { title: "3 New Leads need follow-up", desc: "Rohit Jain, Sanjay Agrawal +1 waiting over 24h", cta: "View Lead", fn: () => router.push("/leads") },
    { title: "2 Quotations awaiting response", desc: "DRC-Q-2026-0047 · DRC-Q-2026-0048", cta: "Send WhatsApp", fn: () => wa("Quotation reminder ready") },
    { title: "1 Payment milestone due", desc: "Sharma Residence — Electrical ₹5.24L", cta: "Record Payment", fn: () => router.push("/finance") },
    { title: "Cement stock is low", desc: "320 bags available vs 1,050 required", cta: "Update Stock", fn: () => router.push("/materials") },
    { title: "2 Projects need progress updates", desc: "Verma Residence · Commercial Building", cta: "Update Project", fn: () => router.push("/projects/verma-residence") },
  ];

  return (
    <Shell>
      <FlowStrip />
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Good Morning, D.R. Construction</h1>
          <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => router.push("/leads")}><Plus size={15} /> New Lead</Button>
          <Button variant="secondary" onClick={() => router.push("/estimator")}>Create Estimate</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="New Leads" value="24" sub="+6 this week" icon={<Users size={16} />} />
        <StatCard label="Active Projects" value="8" sub="Across 4 sites" icon={<HardHat size={16} />} accent="bg-slate-900 text-white" />
        <StatCard label="Site Visits" value="11" sub="4 scheduled today" icon={<MapPin size={16} />} accent="bg-blue-50 text-blue-600" />
        <StatCard label="Pending Quotations" value="6" sub="2 need follow-up" icon={<FileText size={16} />} accent="bg-amber-50 text-amber-600" />
        <StatCard label="Project Value" value="₹2.84 Cr" sub="8 active projects" icon={<IndianRupee size={16} />} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Pending Payments" value="₹27.4L" sub="5 milestones" icon={<Wallet size={16} />} accent="bg-red-50 text-red-600" />
      </div>

      <h2 className="mb-3 mt-7 text-sm font-bold uppercase tracking-wider text-slate-500">Action Required</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((a) => (
          <Card key={a.title} className="card-hover fade-in">
            <p className="text-sm font-bold">{a.title}</p>
            <p className="mt-1 text-xs text-slate-500">{a.desc}</p>
            <Button variant="secondary" className="mt-3 !py-1.5 !text-xs" onClick={a.fn}>{a.cta} <ArrowRight size={13} /></Button>
          </Card>
        ))}
        <Card className="border-dashed !bg-orange-50/50">
          <p className="text-sm font-bold">Sales pipeline health</p>
          <p className="mt-1 text-xs text-slate-500">24 → 11 → 8 → 6 → 3 → 3. Follow up on site visits to lift conversion.</p>
          <Button className="mt-3 !py-1.5 !text-xs" onClick={() => router.push("/leads")}>Open Pipeline</Button>
        </Card>
      </div>

      <h2 className="mb-3 mt-7 text-sm font-bold uppercase tracking-wider text-slate-500">Sales Pipeline</h2>
      <Card className="overflow-x-auto">
        <div className="flex min-w-max items-stretch gap-2">
          {PIPELINE.map((p, i) => (
            <div key={p.label} className="flex items-center gap-2">
              <button onClick={() => router.push("/leads")} className="card-hover w-32 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 text-center">
                <p className="text-2xl font-black">{p.count}</p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-500">{p.label}</p>
              </button>
              {i < PIPELINE.length - 1 && <span className="font-black text-orange-400">→</span>}
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-7 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold">Project Overview</h3>
            <Link href="/projects" className="text-xs font-bold text-orange-600">View all</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((p) => (
              <div key={p.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{p.name}</p>
                  <Badge tone={p.progress > 60 ? "green" : p.progress > 35 ? "amber" : "blue"}>{p.progress}%</Badge>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{inr(p.value)} · {p.location}</p>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="progress-anim h-full rounded-full bg-orange-500" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{inr(p.value)} · {p.progress}% Complete</span>
                </div>
                <Button variant="secondary" className="mt-3 w-full !py-1.5 !text-xs" onClick={() => router.push(`/projects/${p.slug}`)}>
                  <Eye size={13} /> View Project
                </Button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 font-bold">Recent Activity</h3>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                <div><p className="text-[13px] font-medium leading-snug">{a.text}</p><p className="text-[11px] text-slate-400">{a.time}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
            <Button variant="secondary" className="!text-xs" onClick={() => toast("Calling Rahul Sharma…", "Demo — no real call placed")}><Phone size={13} /> Call</Button>
            <Button className="!bg-[#1fa855] !text-xs hover:!bg-[#189346]" onClick={() => wa("WhatsApp preview ready")}><MessageCircle size={13} /> WhatsApp</Button>
            <Button variant="secondary" className="!text-xs" onClick={() => router.push("/site-visits")}><CalendarCheck size={13} /> Site Visit</Button>
            <Button variant="secondary" className="!text-xs" onClick={() => { toast("Stock check", "Cement 320 bags — low"); router.push("/materials"); }}><Package size={13} /> Stock</Button>
            <Button variant="secondary" className="!text-xs" onClick={() => router.push("/finance")}><RefreshCw size={13} /> Payment</Button>
            <Button variant="secondary" className="!text-xs" onClick={() => router.push("/estimator")}><Plus size={13} /> Estimate</Button>
          </div>
          <p className="mt-3 text-[11px] text-slate-400">Paid {inrFull(3144000)} · Pending {inrFull(2096000)} on Sharma Residence.</p>
        </Card>
      </div>
    </Shell>
  );
}
