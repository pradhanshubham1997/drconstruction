"use client";
import { useState } from "react";
import { Upload, Trash2, Plus } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button, Card, EmptyState, PageHeader } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";

const CATS = ["Naksha", "Quotation", "BOQ", "Agreement", "Invoices", "Receipts", "Project Photos"];
const SEED: Record<string, string[]> = {
  Naksha: ["Sharma_Residence_Naksha.pdf"],
  Quotation: ["DRC-Q-2026-0048.pdf"],
  BOQ: ["BOQ-2026-0048.xlsx"],
  Agreement: ["Sharma_Agreement.pdf"],
  Invoices: ["INV-221.pdf", "INV-222.pdf"],
  Receipts: ["RCP-091.pdf"],
  "Project Photos": ["Plaster_Done.jpg", "Electrical_Start.jpg"],
};

export default function Documents() {
  const { toast } = useApp();
  const [cat, setCat] = useState("Naksha");
  const [docs, setDocs] = useState(SEED);
  const [name, setName] = useState("");
  function add() {
    if (!name.trim()) { toast("Enter a file name", "Demo upload — local state only"); return; }
    setDocs({ ...docs, [cat]: [...(docs[cat] ?? []), name] }); setName(""); toast("Uploaded", `${cat} — demo record`);
  }
  const list = docs[cat] ?? [];
  return (
    <Shell>
      <PageHeader title="Documents" sub="Naksha · BOQ · quotations · agreements — demo upload/delete in local state." />
      <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold ${cat === c ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-500"}`}>{c} ({(docs[c] ?? []).length})</button>
        ))}
      </div>
      <Card>
        <div className="flex flex-col gap-2 min-[480px]:flex-row">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={`New ${cat} file name…`} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500" />
          <Button onClick={add}><Upload size={15} /> Upload</Button>
        </div>
        {list.length === 0 ? <div className="mt-4"><EmptyState title={`No ${cat.toLowerCase()} uploaded`} desc="Upload your first document to keep the project file complete." action={<Button onClick={() => toast("Picker opened", "Demo")}><Plus size={14} /> Add Document</Button>} /></div>
          : <div className="mt-3 space-y-2">{list.map((d) => (
            <div key={d} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-sm">
              <span className="font-medium">📄 {d}</span>
              <button onClick={() => { setDocs({ ...docs, [cat]: list.filter((x) => x !== d) }); toast("Deleted", d); }} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"><Trash2 size={15} /></button>
            </div>))}</div>}
      </Card>
    </Shell>
  );
}
