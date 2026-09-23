"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone, Eye } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, Modal, PageHeader } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { customers, projects, quotations } from "@/data/demo";
import { inr } from "@/lib/format";

export default function Customers() {
  const { toast } = useApp();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<(typeof customers)[number] | null>(null);
  const shown = customers.filter((c) => (c.name + c.project + c.location).toLowerCase().includes(q.toLowerCase()));

  return (
    <Shell>
      <PageHeader title="Customers" sub="Customer database — every record connects lead → estimate → project."
        actions={<input placeholder="Search customers…" value={q} onChange={(e) => setQ(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500" />} />
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead><tr className="border-b bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              {["Name", "Phone", "Project", "Location", "Value", "Status", ""].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody>
              {shown.map((c) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-bold">{c.name}</td><td className="px-4 py-3 text-slate-500">{c.phone}</td>
                  <td className="px-4 py-3">{c.project}</td><td className="px-4 py-3 text-slate-500">{c.location}</td>
                  <td className="px-4 py-3 font-bold">{inr(c.value)}</td>
                  <td className="px-4 py-3"><Badge tone="green">{c.status}</Badge></td>
                  <td className="px-4 py-3"><div className="flex gap-1.5">
                    <button onClick={() => setSel(c)} className="rounded-lg bg-slate-100 p-1.5 hover:bg-slate-200"><Eye size={14} /></button>
                    <button onClick={() => toast("Calling…", "Demo")} className="rounded-lg bg-slate-100 p-1.5 hover:bg-slate-200"><Phone size={14} /></button>
                    <button onClick={() => toast("WhatsApp preview ready")} className="rounded-lg bg-[#1fa855]/10 p-1.5 text-[#1fa855]"><MessageCircle size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel ? `${sel.name} — 360° View` : ""} wide>
        {sel && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 gap-2 text-center min-[440px]:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Contract</p><p className="font-extrabold">{inr(sel.value)}</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Progress</p><p className="font-extrabold">{sel.progress}%</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Project</p><p className="font-extrabold">{sel.project}</p></div>
            </div>
            <p className="text-xs text-slate-500">Connected: Lead LD-1048 · DRC-EST-2026-0048 · {quotations[0].id} · {projects[0].name} · Payments · Documents · Messages</p>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => { setSel(null); router.push("/projects/sharma-residence"); }}>Open Project</Button>
              <Button variant="secondary" className="flex-1" onClick={() => { setSel(null); router.push("/customer"); }}>Customer Portal</Button>
            </div>
          </div>
        )}
      </Modal>
    </Shell>
  );
}
