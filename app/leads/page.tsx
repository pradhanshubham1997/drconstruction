"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, MessageCircle, Phone, Plus, Calculator, ArrowRight } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, Modal, PageHeader, inputCls } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { inr } from "@/lib/format";
import type { Lead } from "@/types";

export default function Leads() {
  const { toast, leads: list, addLead: storeLead } = useApp();
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<Lead | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loc, setLoc] = useState("Raipur");

  const stages = ["All", "New", "Follow-up", "Site Visit Done", "Estimate Generated", "Quotation Sent"];
  const shown = filter === "All" ? list : list.filter((l) => l.status === filter);

  function addLead() {
    if (!name.trim()) { toast("Enter a name", "Lead name is required"); return; }
    storeLead({ id: `LD-${1070 + list.length}`, name, phone: phone || "+91 98271 00000", type: "Residential Construction", location: loc, value: 4500000, source: "Manual", status: "New", date: "Just now" });
    setOpen(false); setName(""); setPhone(""); toast("Lead created", `${name} added to pipeline`);
  }

  return (
    <Shell>
      <PageHeader title="Leads" sub="Lead pipeline and list — demo records."
        actions={<><Button variant="secondary" onClick={() => router.push("/estimator")}><Calculator size={15} /> Create Estimate</Button><Button onClick={() => setOpen(true)}><Plus size={15} /> New Lead</Button></>} />
      <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {stages.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold ${filter === s ? "bg-slate-900 text-white" : "bg-white text-slate-500 border border-slate-200"}`}>{s}</button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((l) => (
          <Card key={l.id} className="card-hover">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-sm font-black text-orange-700">{l.name[0]}</div>
                <div><p className="text-sm font-bold">{l.name}</p><p className="text-[11px] text-slate-500">{l.type} · {l.location}</p></div>
              </div>
              <Badge tone={l.status === "New" ? "blue" : l.status.includes("Quotation") ? "amber" : "green"}>{l.status}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="font-extrabold text-slate-900">{inr(l.value)}</span><span>·</span><span>Source: {l.source}</span><span>·</span><span>{l.id}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5 min-[480px]:grid-cols-5">
              <button onClick={() => setDetail(l)} className="rounded-lg bg-slate-100 py-1.5 text-[11px] font-bold hover:bg-slate-200"><Eye size={13} className="mx-auto" />View</button>
              <button onClick={() => toast("Calling…", "Demo — no real call")} className="rounded-lg bg-slate-100 py-1.5 text-[11px] font-bold hover:bg-slate-200"><Phone size={13} className="mx-auto" />Call</button>
              <button onClick={() => toast("WhatsApp preview ready", "Demo — no message sent")} className="rounded-lg bg-[#1fa855]/10 py-1.5 text-[11px] font-bold text-[#1fa855]"><MessageCircle size={13} className="mx-auto" />Chat</button>
              <button onClick={() => router.push("/estimator")} className="rounded-lg bg-slate-900 py-1.5 text-[11px] font-bold text-white"><Calculator size={13} className="mx-auto" />Est.</button>
              <button onClick={() => { toast("Converted to project", `${l.name} → demo project`); router.push("/projects/sharma-residence"); }} className="rounded-lg bg-orange-100 py-1.5 text-[11px] font-bold text-orange-700"><ArrowRight size={13} className="mx-auto" />Won</button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail ? `${detail.name} — Lead Detail` : ""} wide>
        {detail && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 text-sm">
              <p><b>Phone:</b> {detail.phone}</p><p><b>Location:</b> {detail.location}</p>
              <p><b>Plot:</b> {detail.plotArea} sq.ft · <b>Built-up:</b> {detail.builtUpArea} sq.ft</p>
              <p><b>Value:</b> {inr(detail.value)} · <b>Source:</b> {detail.source}</p>
              {detail.estimate != null && <p><b>Website Estimate:</b> {inr(detail.estimate)} · {detail.floors} · {detail.finish}</p>}
              {detail.naksha && <p><b>Naksha:</b> {detail.naksha} (Technical Review Pending)</p>}
              {detail.quotationRef && <p><b>Quotation Request:</b> {detail.quotationRef}{detail.visitDate ? ` · Visit: ${detail.visitDate}` : ""}</p>}
              {detail.visitDate && !detail.quotationRef && <p><b>Site Visit:</b> {detail.visitDate}</p>}
              {detail.message && <p><b>Message:</b> {detail.message}</p>}
              <p><b>Notes:</b> Interested in G+1 premium RCC. Requested estimate + site visit.</p>
              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500">Activity: Enquiry → Site visit scheduled → Estimate generated. Documents: site photo, requirement note.</div>
            </div>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => { setDetail(null); router.push("/estimator"); }}>Create Estimate</Button>
              <Button variant="secondary" className="w-full" onClick={() => { setDetail(null); router.push("/site-visits"); }}>Schedule Site Visit</Button>
              <Button className="w-full !bg-[#1fa855] hover:!bg-[#189346]" onClick={() => toast("WhatsApp preview ready")}>WhatsApp Customer</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)} title="New Lead">
        <div className="space-y-3">
          <input className={inputCls} placeholder="Full name — e.g. Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={inputCls} placeholder="Phone — +91 …" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className={inputCls} placeholder="Location" value={loc} onChange={(e) => setLoc(e.target.value)} />
          <Button className="w-full" onClick={addLead}>Create Lead</Button>
        </div>
      </Modal>
    </Shell>
  );
}
