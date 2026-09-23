"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, BadgeCheck, Building2, Calculator, ClipboardList, FileText,
  Home as HomeIcon, MapPin, MessageCircle, Paintbrush, Smartphone, Wallet,
} from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppModal } from "@/components/site/SiteChrome";
import { projects } from "@/data/demo";
import { inr } from "@/lib/format";

const WA_MSG = "Hello D.R. Construction,\n\nI'm planning a construction project and would like to discuss it with your team.\n\nPlease call me back at your convenience.\n\nThank you!";

const STEPS = [
  { icon: <Calculator size={20} />, title: "1. Share your plot details", desc: "Location, plot size and what you want to build — takes under 2 minutes." },
  { icon: <BadgeCheck size={20} />, title: "2. Get an instant estimate", desc: "See an indicative cost with material quantities, right on your phone." },
  { icon: <FileText size={20} />, title: "3. Upload your Naksha", desc: "Share your drawing for technical review and a detailed BOQ." },
  { icon: <ClipboardList size={20} />, title: "4. Quotation & site visit", desc: "Get a formal quotation and book a free site visit with our engineer." },
  { icon: <HomeIcon size={20} />, title: "5. Build & track progress", desc: "Watch your project rise with milestone payments and photo updates." },
];

const SERVICES = [
  { icon: <HomeIcon size={22} />, title: "Residential Construction", desc: "Custom homes from foundation to finishing — RCC framed, built to your Naksha." },
  { icon: <Building2 size={22} />, title: "Commercial Buildings", desc: "Shops, offices and multi-storey structures with milestone billing." },
  { icon: <Paintbrush size={22} />, title: "Renovation & Finishing", desc: "Structure-only or finishing-only packages for ongoing projects." },
  { icon: <ClipboardList size={22} />, title: "BOQ & Estimation", desc: "Transparent, rate-card based estimates and detailed bills of quantities." },
];

const WHY = [
  { icon: <Wallet size={20} />, title: "Transparent rate card", desc: "Every rupee traces back to published material, labour and finishing rates." },
  { icon: <MessageCircle size={20} />, title: "WhatsApp-first updates", desc: "Estimates, quotations, payment reminders and site photos — where you already are." },
  { icon: <Smartphone size={20} />, title: "Customer portal", desc: "Track progress, payments, documents and milestones from your phone." },
  { icon: <MapPin size={20} />, title: "Local site expertise", desc: "On-ground team across Raipur, Bhilai, Durg and Naya Raipur." },
];

export default function Home() {
  const [wa, setWa] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="map-grid absolute inset-0 opacity-[0.15]" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-20">
          <div className="fade-in">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-orange-300">
              FROM PLOT TO PROJECT
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Know Your Construction Cost <span className="text-orange-400">Before You Build.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Enter your project details and get an indicative construction estimate in seconds.
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/estimate" className="btn-press inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-orange-500/25 hover:bg-orange-600">
                <Calculator size={18} /> Get Free Estimate <ArrowRight size={17} />
              </Link>
              <button onClick={() => setWa(true)} className="btn-press inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-7 py-3.5 text-base font-bold text-white hover:bg-white/5">
                <MessageCircle size={18} /> Talk to D.R. Construction
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-slate-400">
              <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-emerald-400" /> Free indicative estimate</span>
              <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-emerald-400" /> No site visit required</span>
              <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-emerald-400" /> Reply on WhatsApp</span>
            </div>
          </div>

          {/* Estimate preview card */}
          <div className="slide-up mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sample indicative estimate</p>
              <p className="mt-1 text-sm font-bold text-white">Sharma Residence · G+1 · Premium</p>
              <p className="mt-2 text-4xl font-black text-white">₹48,60,000</p>
              <p className="text-sm text-slate-400">₹2,025 / sq.ft · 2,400 sq.ft</p>
              <div className="mt-4 space-y-2">
                {[["Civil & Structure", 78], ["Flooring / Plaster", 45], ["Electrical + Plumbing", 32]].map(([l, w]) => (
                  <div key={l as string}>
                    <div className="flex justify-between text-[11px] text-slate-400"><span>{l as string}</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-orange-400" style={{ width: `${w}%` }} /></div>
                  </div>
                ))}
              </div>
              <Link href="/estimate" className="btn-press mt-5 flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-orange-50">
                Try it with your plot <ArrowRight size={15} />
              </Link>
              <p className="mt-2 text-center text-[10px] text-slate-500">Indicative only · Subject to technical verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">How it works</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">From enquiry to handover, in five steps</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div key={s.title} className="card card-hover p-4">
              <div className="w-fit rounded-xl bg-orange-50 p-2.5 text-orange-600">{s.icon}</div>
              <p className="mt-3 text-sm font-bold text-slate-900">{s.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">Construction services</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">What we build</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="card card-hover p-5">
                <div className="w-fit rounded-2xl bg-slate-900 p-3 text-white">{s.icon}</div>
                <p className="mt-3 font-bold text-slate-900">{s.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">Our work</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Ongoing projects</h2>
          </div>
          <Link href="/estimate" className="text-sm font-bold text-orange-600 hover:text-orange-700">Start yours →</Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <div key={p.id} className="card card-hover overflow-hidden !p-0">
              <div className="map-grid flex h-32 items-center justify-center bg-slate-900">
                <p className="px-4 text-center text-sm font-black text-white">{p.name}</p>
              </div>
              <div className="p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{p.type} · {p.location}</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="font-extrabold text-slate-900">{inr(p.value)}</p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">{p.progress}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-orange-500" style={{ width: `${p.progress}%` }} /></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-slate-400">Representative demo projects shown for illustration.</p>
      </section>

      {/* WHY */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">Why choose us</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">A builder that shows its math</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="w-fit rounded-xl bg-orange-500/15 p-2.5 text-orange-400">{w.icon}</div>
                <p className="mt-3 font-bold text-white">{w.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-orange-500 px-6 py-12 text-center sm:px-12">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-slate-950/10 blur-2xl" />
          <h2 className="relative text-2xl font-black tracking-tight text-white sm:text-4xl">Get your free estimate today.</h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-orange-50 sm:text-base">Answer a few questions about your plot — see your indicative cost in under a minute.</p>
          <div className="relative mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link href="/estimate" className="btn-press inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-3.5 font-bold text-white hover:bg-slate-900">
              <Calculator size={17} /> Get Free Estimate
            </Link>
            <button onClick={() => setWa(true)} className="btn-press inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 px-7 py-3.5 font-bold text-white hover:bg-white/25">
              <MessageCircle size={17} /> Talk to Us
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppModal open={wa} onClose={() => setWa(false)} message={WA_MSG} />
    </div>
  );
}
