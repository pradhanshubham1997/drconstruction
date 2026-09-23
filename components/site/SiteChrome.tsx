"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Calculator, Copy, Lock, Menu, MessageCircle, Phone, X } from "lucide-react";
import { cx } from "@/lib/format";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Estimate", href: "/estimate" },
  { label: "How It Works", href: "/#how" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export function WhatsAppModal({ open, onClose, message }: { open: boolean; onClose: () => void; message: string }) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="slide-up thin-scroll max-h-[92dvh] w-full overflow-y-auto overscroll-contain bg-white p-5 shadow-2xl max-sm:rounded-t-3xl sm:max-w-md sm:rounded-3xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900"><MessageCircle size={17} className="text-[#1fa855]" /> Talk on WhatsApp</h3>
          <button onClick={onClose} className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="rounded-2xl bg-[#e7ffdb] p-4 text-sm leading-relaxed whitespace-pre-line text-slate-800">{message}</div>
        <p className="mt-2 text-[11px] text-slate-400">Demo — no message is actually sent.</p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => { navigator.clipboard?.writeText(message).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="btn-press flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-700">
            <Copy size={15} /> {copied ? "Copied ✓" : "Copy"}
          </button>
          <a href={`https://wa.me/919827100000?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"
            className="btn-press flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1fa855] px-3 py-2.5 text-sm font-bold text-white hover:bg-[#189346]">
            <MessageCircle size={15} /> Open WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 font-black text-white">DR</div>
          <div className="leading-tight">
            <p className="text-[13px] font-extrabold tracking-tight text-white">D.R. CONSTRUCTION</p>
            <p className="text-[10px] font-medium tracking-[0.18em] text-orange-400">FROM PLOT TO PROJECT</p>
          </div>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href}
              className={cx("rounded-lg px-3 py-2 text-sm font-medium transition",
                path === l.href ? "text-white bg-white/10" : "text-slate-300 hover:text-white hover:bg-white/5")}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <Link href="/dashboard" className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-medium text-slate-400 transition hover:text-white md:inline-flex">
          <Lock size={13} /> Owner Login
        </Link>
        <Link href="/estimate" className="btn-press hidden items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 sm:inline-flex">
          <Calculator size={15} /> Get Free Estimate
        </Link>
        <button onClick={() => setMenu((m) => !m)} className="rounded-xl p-2 text-slate-200 hover:bg-white/10 md:hidden" aria-label="Menu">
          {menu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menu && (
        <div className="fade-in border-t border-white/10 px-4 pb-5 pt-3 md:hidden">
          <div className="grid gap-1">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMenu(false)} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5">{l.label}</Link>
            ))}
            <Link href="/estimate" onClick={() => setMenu(false)} className="btn-press mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white">
              <Calculator size={15} /> Get Free Estimate
            </Link>
            <Link href="/dashboard" onClick={() => setMenu(false)} className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300">
              <Lock size={13} /> Owner Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 font-black text-white">DR</div>
            <div><p className="text-sm font-extrabold text-white">D.R. CONSTRUCTION</p><p className="text-[10px] tracking-[0.18em] text-orange-400">FROM PLOT TO PROJECT</p></div>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">Estimate Faster. Quote Smarter. Build Better. Residential and commercial construction across Chhattisgarh.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="tel:+919827100000" className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3.5 py-2 text-sm font-semibold hover:bg-white/5"><Phone size={14} /> +91 98271 00000</a>
            <Link href="/estimate" className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-3.5 py-2 text-sm font-bold text-white hover:bg-orange-600"><Calculator size={14} /> Get Free Estimate</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Explore</p>
          <div className="mt-3 grid gap-2 text-sm">{LINKS.map((l) => <Link key={l.label} href={l.href} className="hover:text-white">{l.label}</Link>)}</div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Office</p>
          <p className="mt-3 text-sm leading-relaxed">Sector 27, Raipur,<br />Chhattisgarh<br />Mon–Sat · 9am–7pm</p>
          <Link href="/dashboard" className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-white"><Lock size={12} /> Owner Login</Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-[11px] text-slate-500 sm:px-6">© 2026 D.R. Construction · Demo website for product demonstration only. Estimates are indicative and subject to technical verification.</p>
      </div>
    </footer>
  );
}
