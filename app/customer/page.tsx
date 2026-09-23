"use client";
import { MessageCircle, Phone, FileText, Download } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { inrFull } from "@/lib/format";

export default function CustomerPortal() {
  const { toast } = useApp();
  return (
    <Shell>
      <div className="mx-auto max-w-md">
        <Card className="!rounded-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">D.R. Construction · Customer Portal</p>
          <h1 className="mt-1 text-2xl font-black">Sharma Residence</h1>
          <p className="text-xs text-slate-500">Rahul Sharma · Raipur</p>
          <div className="mx-auto mt-4 h-28 w-28">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="12" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#ea580c" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${64 * 2.64} 264`} className="progress-anim" />
            </svg>
            <p className="-mt-[72px] text-2xl font-black">64%</p>
          </div>
          <p className="mt-8 text-xs font-bold text-slate-500">PROJECT PROGRESS</p>
        </Card>

        <div className="mt-3 grid grid-cols-1 gap-2 text-center min-[420px]:grid-cols-3">
          <div className="card p-3"><p className="text-[10px] font-bold text-slate-400">CONTRACT</p><p className="font-extrabold">{inrFull(5240000)}</p></div>
          <div className="card p-3"><p className="text-[10px] font-bold text-emerald-600">PAID</p><p className="font-extrabold">{inrFull(3144000)}</p></div>
          <div className="card p-3"><p className="text-[10px] font-bold text-amber-600">PENDING</p><p className="font-extrabold">{inrFull(2096000)}</p></div>
        </div>

        <Card className="mt-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Milestone</p>
          <p className="mt-1 font-bold">Electrical Work <Badge tone="amber">In Progress</Badge></p>
          <p className="mt-1 text-sm">Next Payment: <b>{inrFull(524000)}</b> · due this week</p>
          <Button className="mt-3 w-full" onClick={() => toast("Payment flow (demo)", "No gateway connected")}>Pay {inrFull(524000)}</Button>
        </Card>

        <Card className="mt-3">
          <h3 className="font-bold">Recent Updates</h3>
          {[["Electrical work started", "80% complete · Today"], ["Plaster work completed", "Curing in progress · Yesterday"], ["Site inspection completed", "Quality passed · 2 days ago"]].map(([t, s]) => (
            <div key={t} className="flex gap-2.5 border-b py-2.5 text-sm last:border-0">
              <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <div><p className="font-semibold">{t}</p><p className="text-xs text-slate-500">{s}</p></div>
            </div>
          ))}
        </Card>

        <Card className="mt-3">
          <h3 className="font-bold">Documents</h3>
          {["Quotation DRC-Q-2026-0048", "Agreement", "Naksha", "Payment Receipts"].map((d) => (
            <div key={d} className="flex items-center justify-between border-b py-2 text-sm last:border-0">
              <span className="flex items-center gap-1.5"><FileText size={14} className="text-slate-400" /> {d}</span>
              <button onClick={() => window.print()} className="font-bold text-orange-600"><Download size={14} /></button>
            </div>
          ))}
        </Card>

        <div className="sticky bottom-16 mt-3 flex gap-2 lg:bottom-4">
          <Button variant="secondary" className="flex-1" onClick={() => toast("Calling site engineer…", "Demo")}><Phone size={15} /> Contact</Button>
          <Button className="flex-1 !bg-[#1fa855] hover:!bg-[#189346]" onClick={() => toast("WhatsApp preview ready", "Demo")}><MessageCircle size={15} /> WhatsApp</Button>
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-400">Demo portal preview — what your customer sees on mobile.</p>
      </div>
    </Shell>
  );
}
