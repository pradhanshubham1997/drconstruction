"use client";
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { Button, Card, PageHeader, inputCls } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";

export default function Settings() {
  const { toast } = useApp();
  const [name, setName] = useState("D.R. Construction");
  const [phone, setPhone] = useState("+91 98271 00000");
  return (
    <Shell>
      <PageHeader title="Settings" sub="Business profile + preferences (demo, local only)." />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <h3 className="font-bold">Business Profile</h3>
          <div className="mt-3 space-y-3">
            <div><p className="mb-1 text-xs font-bold text-slate-500">COMPANY NAME</p><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><p className="mb-1 text-xs font-bold text-slate-500">PHONE</p><input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div><p className="mb-1 text-xs font-bold text-slate-500">ADDRESS</p><input className={inputCls} defaultValue="Raipur, Chhattisgarh" /></div>
            <Button onClick={() => toast("Settings saved", "Demo — stored locally")}>Save Settings</Button>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold">Preferences</h3>
          {[["WhatsApp notifications", true], ["Payment reminders", true], ["Low-stock alerts", true], ["Customer portal updates", false]].map(([l, on]) => (
            <div key={l as string} className="flex items-center justify-between border-b py-2.5 text-sm last:border-0">
              <span>{l as string}</span>
              <button onClick={() => toast("Preference toggled", l as string)} className={`h-6 w-11 rounded-full p-0.5 ${on ? "bg-emerald-500" : "bg-slate-200"}`}>
                <span className={`block h-5 w-5 rounded-full bg-white shadow ${on ? "ml-auto" : ""}`} />
              </button>
            </div>
          ))}
          <p className="mt-3 text-[11px] text-slate-400">Demo Mode · Demo data — for product demonstration only.</p>
        </Card>
      </div>
    </Shell>
  );
}
