"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, Circle, ArrowRight, Camera, MessageCircle, FileText, IndianRupee, Send } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, Modal, PageHeader } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { projects, timeline } from "@/data/demo";
import { inr, inrFull } from "@/lib/format";

const MILESTONES = [
  { label: "Booking 10%", amt: 524000, state: "paid" }, { label: "Foundation 20%", amt: 1048000, state: "paid" },
  { label: "Structure 20%", amt: 1048000, state: "paid" }, { label: "Brick/Plaster 20%", amt: 1048000, state: "paid" },
  { label: "Electrical 20%", amt: 524000, state: "due" }, { label: "Finishing 20%", amt: 0, state: "upcoming" },
  { label: "Handover 10%", amt: 0, state: "upcoming" },
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useApp();
  const slug = (params?.slug as string) ?? "sharma-residence";
  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  const [updates, setUpdates] = useState([
    { title: "Electrical work started", desc: "Conduit + wiring — 80% complete", time: "Today" },
    { title: "Plaster work completed", desc: "Internal plaster done, curing in progress", time: "Yesterday" },
    { title: "Site inspection completed", desc: "Quality check passed by site engineer", time: "2 days ago" },
  ]);
  const [addOpen, setAddOpen] = useState(false);
  const [paid, setPaid] = useState(false);

  return (
    <Shell>
      <PageHeader title={project.name} sub={`${project.type} · ${project.location} · ${project.customer}`}
        actions={<><Button variant="secondary" onClick={() => router.push("/customer")}><MessageCircle size={15} /> Customer View</Button><Button onClick={() => setAddOpen(true)}><Camera size={15} /> Add Update</Button></>} />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[["Contract Value", inrFull(project.value)], ["Received", inrFull(project.received)], ["Pending", inrFull(project.pending)], ["Progress", `${project.progress}%`]].map(([l, v]) => (
          <div key={l} className="card p-4"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{l}</p><p className="mt-1 text-xl font-black">{v}</p></div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h3 className="font-bold">Project Timeline</h3>
          <div className="mt-3 space-y-0">
            {timeline.map((t) => (
              <div key={t.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {t.done ? <CheckCircle2 size={18} className="text-emerald-500" /> : t.current ? <ArrowRight size={18} className="text-orange-500" /> : <Circle size={18} className="text-slate-300" />}
                  <div className="w-px flex-1 bg-slate-100" />
                </div>
                <p className={`pb-4 text-sm ${t.done ? "font-semibold text-slate-800" : t.current ? "font-bold text-orange-600" : "text-slate-400"}`}>{t.label} {t.current && <Badge tone="orange">In Progress</Badge>}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-2 font-bold">Progress Updates</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {updates.map((u, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border">
                <div className="map-grid flex h-24 items-center justify-center bg-slate-50 text-[11px] font-bold text-slate-400">SITE PHOTO · {u.time}</div>
                <div className="p-3"><p className="text-[13px] font-bold">{u.title}</p><p className="text-xs text-slate-500">{u.desc}</p></div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="flex items-center gap-1.5 font-bold"><IndianRupee size={16} /> Payments</h3>
            <div className="mt-3 space-y-2">
              {MILESTONES.map((m) => (
                <div key={m.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-[13px]">
                  <span className="font-medium">{m.label}</span>
                  {m.state === "paid" ? <Badge tone="green">✓ Paid</Badge> : m.state === "due" ? <Badge tone="red">{inr(m.amt)} Due</Badge> : <Badge>Upcoming</Badge>}
                </div>
              ))}
            </div>
            <Button className="mt-3 w-full !text-xs" onClick={() => { setPaid(true); toast("Payment reminder sent", "Demo — WhatsApp preview ready"); }}><Send size={13} /> {paid ? "Reminder Sent ✓" : "Send Payment Reminder"}</Button>
            <Button variant="secondary" className="mt-2 w-full !text-xs" onClick={() => { toast("₹5.24L recorded", "Electrical milestone — demo"); router.push("/finance"); }}>Record Payment</Button>
          </Card>
          <Card>
            <h3 className="flex items-center gap-1.5 font-bold"><FileText size={16} /> Documents</h3>
            <div className="mt-2 space-y-1.5 text-xs">
              {["Quotation DRC-Q-2026-0048", "Agreement", "Naksha PDF", "Payment Receipts"].map((d) => (
                <div key={d} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"><span className="font-medium">{d}</span><button onClick={() => router.push("/documents")} className="font-bold text-orange-600">Open</button></div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Progress Update">
        <div className="space-y-3">
          <input className="w-full rounded-xl border px-3 py-2.5 text-sm" placeholder="e.g. Electrical work started" id="upd-title" />
          <textarea className="w-full rounded-xl border px-3 py-2.5 text-sm" placeholder="Description + % complete" id="upd-desc" rows={3} />
          <Button className="w-full" onClick={() => {
            const t = (document.getElementById("upd-title") as HTMLInputElement)?.value || "Site update";
            const d = (document.getElementById("upd-desc") as HTMLTextAreaElement)?.value || "Progress shared with customer";
            setUpdates([{ title: t, desc: d, time: "Just now" }, ...updates]); setAddOpen(false); toast("Update published", "Visible in Customer Portal (demo)");
          }}>Publish Update</Button>
        </div>
      </Modal>
    </Shell>
  );
}
