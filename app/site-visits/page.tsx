"use client";
import { useState } from "react";
import { MapPin, Phone, MessageCircle, CheckCircle2, Plus } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, Modal, PageHeader, inputCls } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { siteVisits as seed } from "@/data/demo";

export default function SiteVisits() {
  const { toast } = useApp();
  const [list, setList] = useState(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <Shell>
      <PageHeader title="Site Visits" sub="Calendar + list — demo schedule." actions={<Button onClick={() => setOpen(true)}><Plus size={15} /> New Site Visit</Button>} />
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((s) => (
          <Card key={s.id} className="card-hover">
            <div className="flex items-start justify-between">
              <div><p className="font-bold">{s.name}</p><p className="text-xs text-slate-500">{s.project} · {s.time}</p></div>
              <Badge tone={s.status === "Completed" ? "green" : "blue"}>{s.status}</Badge>
            </div>
            <p className="mt-2 flex items-center gap-1 text-xs text-slate-500"><MapPin size={13} /> {s.location} · Assigned: {s.assignee}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Button variant="secondary" className="!py-1.5 !text-xs" onClick={() => toast("Opening map…", "Demo map preview")}>Open Map</Button>
              <Button variant="secondary" className="!py-1.5 !text-xs" onClick={() => toast("Calling…", "Demo")}><Phone size={13} /> Call</Button>
              <Button className="!bg-[#1fa855] !py-1.5 !text-xs hover:!bg-[#189346]" onClick={() => toast("WhatsApp preview ready")}><MessageCircle size={13} /> WhatsApp</Button>
              {s.status !== "Completed" && <Button variant="dark" className="!py-1.5 !text-xs" onClick={() => { setList(list.map((x) => x.id === s.id ? { ...x, status: "Completed" } : x)); toast("Visit completed", s.id); }}><CheckCircle2 size={13} /> Mark Complete</Button>}
              <Button variant="ghost" className="!py-1.5 !text-xs" onClick={() => toast("Note saved", "Demo — stored locally")}>Add Notes</Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="New Site Visit">
        <div className="space-y-3">
          <input className={inputCls} placeholder="Customer name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={inputCls} placeholder="Location" defaultValue="Raipur" />
          <input className={inputCls} type="datetime-local" />
          <Button className="w-full" onClick={() => { if (!name.trim()) { toast("Enter a name"); return; } setList([{ id: `SV-${30 + list.length}`, name, project: "New Project", time: "Tomorrow", location: "Raipur", assignee: "D.R. Team", status: "Scheduled" }, ...list]); setOpen(false); setName(""); toast("Site visit scheduled"); }}>Schedule Visit</Button>
        </div>
      </Modal>
    </Shell>
  );
}
