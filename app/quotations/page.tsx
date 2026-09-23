"use client";
import { useState } from "react";
import { Eye, MessageCircle, Plus, Printer, Send, Copy } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, Modal, PageHeader, inputCls } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { quotations as seed } from "@/data/demo";
import { inrFull } from "@/lib/format";

export default function Quotations() {
  const { toast } = useApp();
  const [list] = useState(seed);
  const [preview, setPreview] = useState<(typeof seed)[number] | null>(null);
  const [builder, setBuilder] = useState(false);
  const [wa, setWa] = useState(false);

  return (
    <Shell>
      <PageHeader title="Quotations" sub="Professional quotations with payment schedule + terms."
        actions={<><Button variant="secondary" onClick={() => setBuilder(true)}>Quotation Builder</Button><Button onClick={() => setBuilder(true)}><Plus size={15} /> New Quotation</Button></>} />
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm">
          <thead><tr className="border-b bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">{["Quotation", "Customer", "Project", "Amount", "Status", "Created", ""].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>{list.map((q) => (
            <tr key={q.id} className="border-b last:border-0 hover:bg-slate-50/60">
              <td className="px-4 py-3 font-bold">{q.id}</td><td className="px-4 py-3">{q.customer}</td><td className="px-4 py-3">{q.project}</td>
              <td className="px-4 py-3 font-extrabold">{inrFull(q.amount)}</td>
              <td className="px-4 py-3"><Badge tone={q.status === "Negotiation" ? "amber" : q.status === "Sent" ? "blue" : q.status === "Viewed" ? "green" : "slate"}>{q.status}</Badge></td>
              <td className="px-4 py-3 text-slate-500">{q.created}</td>
              <td className="px-4 py-3"><div className="flex gap-1.5">
                <button onClick={() => setPreview(q)} className="rounded-lg bg-slate-100 p-1.5 hover:bg-slate-200"><Eye size={14} /></button>
                <button onClick={() => setWa(true)} className="rounded-lg bg-[#1fa855]/10 p-1.5 text-[#1fa855]"><MessageCircle size={14} /></button>
                <button onClick={() => window.print()} className="rounded-lg bg-slate-100 p-1.5 hover:bg-slate-200"><Printer size={14} /></button>
              </div></td>
            </tr>))}
          </tbody>
        </table></div>
      </Card>

      <Modal open={!!preview} onClose={() => setPreview(null)} title={preview ? `Quotation ${preview.id}` : ""} wide>
        {preview && (
          <div className="print-full rounded-2xl border p-5">
            <div className="flex items-start justify-between border-b pb-3">
              <div><p className="text-lg font-black">D.R. CONSTRUCTION</p><p className="text-xs text-slate-500">From Plot to Project · Raipur, Chhattisgarh</p></div>
              <div className="text-right"><p className="wrap-anywhere font-bold">{preview.id}</p><p className="text-2xl font-black text-orange-600">{inrFull(preview.amount)}</p></div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs min-[480px]:grid-cols-3">
              <div><p className="font-bold text-slate-400">CUSTOMER</p><p className="font-bold">{preview.customer}</p></div>
              <div><p className="font-bold text-slate-400">PROJECT</p><p className="font-bold">{preview.project}</p></div>
              <div><p className="font-bold text-slate-400">LOCATION</p><p className="font-bold">Raipur</p></div>
            </div>
            <div className="mt-3 text-xs leading-relaxed">
              <p className="font-bold">Scope:</p><p className="text-slate-600">RCC framed structure G+1, 2400 sq.ft premium finish — civil, brick/block, plaster, flooring, electrical, plumbing, doors/windows, painting. Drawing review required before execution.</p>
              <p className="mt-2 font-bold">Payment Schedule:</p>
              <p className="text-slate-600">10% Booking · 20% Foundation · 20% Structure · 20% Brick/Plaster · 20% Finishing · 10% Handover</p>
              <p className="mt-2 font-bold">Terms:</p><p className="text-slate-600">Valid 15 days · Indicative BOQ subject to drawings & site verification · Taxes as applicable · Signature required.</p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="text-[11px] text-slate-400">Validity: 15 days<br />Subject to technical verification</div>
              <div className="text-center text-[11px] text-slate-500"><div className="h-10 w-36 border-b border-slate-300" />Authorised Signatory</div>
            </div>
            <div className="print-hidden mt-4 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => window.print()}><Printer size={14} /> Download PDF</Button>
              <Button className="flex-1 !bg-[#1fa855] hover:!bg-[#189346]" onClick={() => { setPreview(null); setWa(true); }}><Send size={14} /> WhatsApp</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={builder} onClose={() => setBuilder(false)} title="Quotation Builder — DRC-Q-2026-0048" wide>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={inputCls} defaultValue="Rahul Sharma" />
          <input className={inputCls} defaultValue="Sharma Residence" />
          <input className={inputCls} defaultValue="Raipur" />
          <input className={inputCls} defaultValue="₹52,40,000" />
          <div className="sm:col-span-2 rounded-xl bg-slate-50 p-3 text-xs">Scope auto-filled from estimate DRC-EST-2026-0048 · Materials + Labour + Finishing · Payment: 10/20/20/20/20/10</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => { setBuilder(false); setPreview(seed[0]); }}><Eye size={14} /> Preview</Button>
          <Button variant="secondary" onClick={() => { toast("Quotation saved", "DRC-Q-2026-0048"); setBuilder(false); }}>Save</Button>
          <Button variant="secondary" onClick={() => window.print()}><Printer size={14} /> PDF</Button>
          <Button onClick={() => { setBuilder(false); toast("Quotation sent", "Demo — shared + logged"); }}><Send size={14} /> Send</Button>
        </div>
      </Modal>

      <Modal open={wa} onClose={() => setWa(false)} title="WhatsApp Preview (demo)">
        <div className="rounded-2xl bg-[#e7ffdb] p-4 text-sm whitespace-pre-line">Hello Rahul, your quotation DRC-Q-2026-0048 for Sharma Residence is ₹52,40,000. Valid 15 days. Shall we schedule a site discussion? — D.R. Construction</div>
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => toast("Copied")}><Copy size={14} /> Copy</Button>
          <Button className="flex-1 !bg-[#1fa855]" onClick={() => { toast("Opening WhatsApp…", "Demo"); setWa(false); }}>Open WhatsApp</Button>
        </div>
      </Modal>
    </Shell>
  );
}
