"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart3, Bell, Building2, Calculator, ClipboardList, FileText, HardHat,
  Home, IndianRupee, MapPin, Plus, Search, Settings, SlidersHorizontal,
  Smartphone, Users, Wallet, Package, CalendarCheck, BookOpen,
} from "lucide-react";
import { cx, inrFull } from "@/lib/format";
import { useApp } from "./AppProvider";
import { customers, projects, quotations, siteVisits, notifications } from "@/data/demo";
import { Modal, Button } from "@/components/ui/ui";

const NAV: { section: string; items: { href: string; label: string; icon: React.ReactNode }[] }[] = [
  { section: "Overview", items: [{ href: "/dashboard", label: "Dashboard", icon: <Home size={17} /> }] },
  {
    section: "Sales", items: [
      { href: "/leads", label: "Leads", icon: <Users size={17} /> },
      { href: "/customers", label: "Customers", icon: <Building2 size={17} /> },
      { href: "/site-visits", label: "Site Visits", icon: <MapPin size={17} /> },
      { href: "/estimator", label: "Estimator", icon: <Calculator size={17} /> },
      { href: "/estimates", label: "Estimates", icon: <ClipboardList size={17} /> },
      { href: "/quotations", label: "Quotations", icon: <FileText size={17} /> },
    ],
  },
  {
    section: "Projects", items: [
      { href: "/projects", label: "Projects", icon: <HardHat size={17} /> },
      { href: "/documents", label: "Documents", icon: <BookOpen size={17} /> },
    ],
  },
  {
    section: "Operations", items: [
      { href: "/materials", label: "Materials", icon: <Package size={17} /> },
      { href: "/labour", label: "Labour", icon: <Users size={17} /> },
      { href: "/finance", label: "Finance", icon: <Wallet size={17} /> },
    ],
  },
  {
    section: "Customer", items: [
      { href: "/customer", label: "Customer Portal", icon: <Smartphone size={17} /> },
    ],
  },
  {
    section: "Analytics", items: [
      { href: "/analytics", label: "Reports", icon: <BarChart3 size={17} /> },
    ],
  },
  {
    section: "Settings", items: [
      { href: "/settings/rates", label: "Rate Card", icon: <SlidersHorizontal size={17} /> },
      { href: "/settings", label: "Settings", icon: <Settings size={17} /> },
    ],
  },
];

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard", "/leads": "Leads", "/customers": "Customers",
  "/site-visits": "Site Visits", "/estimator": "Construction Cost Estimator",
  "/estimates": "Estimates", "/quotations": "Quotations", "/projects": "Projects",
  "/materials": "Materials", "/labour": "Labour", "/finance": "Finance",
  "/documents": "Documents", "/customer": "Customer Portal", "/analytics": "Analytics",
  "/settings/rates": "Rate Card", "/settings": "Settings",
};

export function Sidebar({ onNav }: { mobile?: boolean; onNav?: () => void }) {
  const path = usePathname();
  return (
    <div className="flex h-full flex-col">
      <Link href="/dashboard" onClick={onNav} className="flex items-center gap-2.5 px-5 pb-4 pt-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 font-black text-white">DR</div>
        <div>
          <p className="text-[13px] font-extrabold leading-none tracking-tight">D.R. CONSTRUCTION</p>
          <p className="mt-1 text-[11px] font-medium text-slate-500">Construction OS</p>
        </div>
      </Link>
      <div className="thin-scroll flex-1 overflow-y-auto px-3 pb-3">
        {NAV.map((g) => (
          <div key={g.section} className="mb-3">
            <p className="px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{g.section}</p>
            {g.items.map((it) => {
              const active = path === it.href || (it.href !== "/dashboard" && path.startsWith(it.href));
              return (
                <Link key={it.href} href={it.href} onClick={onNav}
                  className={cx("mb-0.5 flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium transition",
                    active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}>
                  {it.icon}<span>{it.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 p-3">
        <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-3">
          <p className="inline-flex rounded-md bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-black tracking-wider text-amber-950">DEMO MODE</p>
          <p className="mt-1.5 text-[11px] leading-snug text-amber-800">Demo data — for product demonstration only.</p>
        </div>
      </div>
    </div>
  );
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { toast, search, setSearch, leads } = useApp();
  const [notif, setNotif] = useState(false);
  const [quick, setQuick] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const title = TITLES[path] ?? (path.startsWith("/projects/") ? "Project Detail" : "D.R. Construction OS");

  const q = search.trim().toLowerCase();
  const results = q ? [
    ...leads.filter((l) => (l.name + l.location + l.id).toLowerCase().includes(q)).map((l) => ({ label: `${l.name} — Lead ${l.id}`, href: "/leads" })),
    ...customers.filter((c) => (c.name + c.project).toLowerCase().includes(q)).map((c) => ({ label: `${c.name} — ${c.project}`, href: "/customers" })),
    ...projects.filter((p) => (p.name + p.customer).toLowerCase().includes(q)).map((p) => ({ label: `${p.name} — Project`, href: `/projects/${p.slug}` })),
    ...quotations.filter((x) => (x.id + x.customer).toLowerCase().includes(q)).map((x) => ({ label: `${x.id} — ${inrFull(x.amount)}`, href: "/quotations" })),
    ...siteVisits.filter((s) => (s.name + s.project).toLowerCase().includes(q)).map((s) => ({ label: `${s.name} — Site Visit`, href: "/site-visits" })),
  ].slice(0, 8) : [];

  const quickItems = [
    { label: "New Lead", href: "/leads" }, { label: "New Estimate", href: "/estimator" },
    { label: "New Site Visit", href: "/site-visits" }, { label: "New Quotation", href: "/quotations" },
    { label: "New Project", href: "/projects" }, { label: "Record Payment", href: "/finance" },
  ];

  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-3 sm:px-5">
        <button onClick={onMenu} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden">☰</button>
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-bold text-slate-900">{title}</p>
          <p className="text-[11px] text-slate-400">D.R. Construction OS · From Plot to Project</p>
        </div>
        <div className="flex-1" />
        <div className="relative hidden md:block md:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search "Sharma" — leads, projects…'
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-orange-500 focus:bg-white" />
          {q && (
            <div className="card absolute mt-2 w-full overflow-hidden p-1.5">
              {results.length === 0 && <p className="p-3 text-xs text-slate-500">No matches for “{search}”.</p>}
              {results.map((r, i) => (
                <button key={i} onClick={() => { router.push(r.href); setSearch(""); }} className="block w-full rounded-lg px-3 py-2 text-left text-[13px] hover:bg-slate-50">{r.label}</button>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setShowSearch((s) => !s)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 md:hidden"><Search size={18} /></button>
        <button onClick={() => setNotif(true)} className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100">
          <Bell size={18} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button onClick={() => setQuick(true)} className="btn-press hidden items-center gap-1 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white sm:inline-flex"><Plus size={15} /> Quick Add</button>
        <button onClick={() => setQuick(true)} className="btn-press rounded-xl bg-slate-900 p-2 text-white sm:hidden"><Plus size={16} /></button>
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-3 lg:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-xs font-black text-orange-700">DR</div>
          <div className="leading-tight"><p className="text-xs font-bold">D.R. Construction</p><p className="text-[10px] text-slate-400">Owner</p></div>
        </div>
      </div>
      {showSearch && (
        <div className="border-t border-slate-100 p-2 md:hidden">
          <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads, projects…" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-500" />
          {q && <div className="mt-2">{results.map((r, i) => (<button key={i} onClick={() => { router.push(r.href); setSearch(""); setShowSearch(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">{r.label}</button>))}</div>}
        </div>
      )}
      <Modal open={notif} onClose={() => setNotif(false)} title="Notifications">
        <div className="max-h-[60vh] space-y-2 overflow-y-auto">
          {notifications.map((n, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <p className="text-[13px] font-semibold">{n.title}</p>
              <p className="text-xs text-slate-500">{n.desc} · {n.time}</p>
            </div>
          ))}
        </div>
      </Modal>
      <Modal open={quick} onClose={() => setQuick(false)} title="Quick Create">
        <div className="grid grid-cols-2 gap-2">
          {quickItems.map((x) => (
            <button key={x.label} onClick={() => { setQuick(false); router.push(x.href); toast(x.label, "Opened demo workspace"); }}
              className="rounded-xl border border-slate-200 p-3 text-left text-sm font-semibold hover:border-orange-300 hover:bg-orange-50">{x.label}</button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => { setQuick(false); router.push("/materials"); }}>Add Material</Button>
          <Button variant="dark" className="flex-1" onClick={() => setQuick(false)}>Close</Button>
        </div>
      </Modal>
    </header>
  );
}

export function MobileNav() {
  const path = usePathname();
  const items = [
    { href: "/dashboard", label: "Home", icon: <Home size={19} /> },
    { href: "/estimator", label: "Estimate", icon: <Calculator size={19} /> },
    { href: "/projects", label: "Projects", icon: <HardHat size={19} /> },
    { href: "/finance", label: "Money", icon: <IndianRupee size={19} /> },
    { href: "/customer", label: "Portal", icon: <Smartphone size={19} /> },
  ];
  return (
    <nav className="print-hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const active = path === it.href || path.startsWith(it.href + "/");
          return (
            <Link key={it.href} href={it.href} className={cx("flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold", active ? "text-orange-600" : "text-slate-400")}>
              {it.icon}{it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 border-r border-slate-200/80 bg-white lg:block">
        <Sidebar />
      </aside>
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMenu(false)} />
          <aside className="absolute inset-y-0 left-0 w-[85vw] max-w-72 overflow-y-auto bg-white shadow-2xl"><Sidebar mobile onNav={() => setMenu(false)} /></aside>
        </div>
      )}
      <div className="lg:pl-60">
        <Topbar onMenu={() => setMenu(true)} />
        <main className="mx-auto w-full max-w-6xl px-3 pb-24 pt-5 sm:px-5 lg:pb-10">{children}</main>
      </div>
      <div className="hidden lg:block" />
      <MobileNav />
    </div>
  );
}

export function FlowStrip() {
  const steps = ["Enquiry", "Site", "Estimate", "Quotation", "Project", "Payments", "Updates"];
  return (
    <div className="card mb-5 overflow-x-auto p-3 no-scrollbar">
      <div className="flex min-w-max items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className={cx("rounded-full px-3 py-1.5 text-[11px] font-bold", i <= 3 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500")}>{i + 1} · {s}</span>
            {i < steps.length - 1 && <span className="text-slate-300">→</span>}
          </div>
        ))}
        <span className="ml-2 hidden text-[11px] text-slate-400 xl:inline">Customer Enquiry → Site → Estimate → Quotation → Project → Payments → Customer Updates</span>
      </div>
    </div>
  );
}

export function WhatsAppButton({ label = "WhatsApp", onClick, className }: { label?: string; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={cx("btn-press inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1fa855] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#189346]", className)}>
      <CalendarCheck size={0} className="hidden" />{label}
    </button>
  );
}
