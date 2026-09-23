"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Building2, Calculator, CalendarCheck,
  CheckCircle2, Download, FileUp, MapPin, MessageCircle, Sparkles, Upload,
} from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppModal } from "@/components/site/SiteChrome";
import { useApp } from "@/components/layout/AppProvider";
import { calculateEstimate } from "@/lib/estimate";
import { cx, inr, inrFull, num } from "@/lib/format";
import { inputCls } from "@/components/ui/ui";
import type { ConstructionStage, ConstructionType, FinishQuality } from "@/types";

const ANIM_STEPS = ["Analyzing project", "Applying rate card", "Calculating materials", "Preparing estimate"];
const STEP_LABELS = ["Location", "Plot", "Construction", "Naksha", "Your Details"];

type FloorsOpt = "Ground" | "G+1" | "G+2" | "G+3+";
type ConstructionOpt = "Residential" | "Commercial";
type StageOpt = "Complete" | "Structure Only" | "Finishing Only";

const toEngineType = (c: ConstructionOpt): ConstructionType => (c === "Commercial" ? "RCC Commercial" : "RCC Residential");
const toEngineStage = (s: StageOpt): ConstructionStage =>
  s === "Structure Only" ? "Structure Only" : s === "Finishing Only" ? "Finishing Only" : "Complete Construction";

function Seg<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={cx("rounded-xl border px-2 py-2.5 text-xs font-bold leading-tight transition min-[420px]:text-sm",
            value === o ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm" : "border-slate-200 text-slate-500 hover:border-slate-300")}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function CustomerEstimate() {
  const { rates, toast, addLead, updateLead } = useApp();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Step 1
  const [location, setLocation] = useState("Raipur, Chhattisgarh");
  // Step 2
  const [plotArea, setPlotArea] = useState(1500);
  const [plotLen, setPlotLen] = useState(50);
  const [plotWid, setPlotWid] = useState(30);
  const [boundary, setBoundary] = useState(false);
  // Step 3
  const [builtUp, setBuiltUp] = useState(2400);
  const [floors, setFloors] = useState<FloorsOpt>("G+1");
  const [construction, setConstruction] = useState<ConstructionOpt>("Residential");
  const [finish, setFinish] = useState<FinishQuality>("Premium");
  const [stage, setStage] = useState<StageOpt>("Complete");
  // Step 4
  const [naksha, setNaksha] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // Step 5
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameWa, setSameWa] = useState(true);
  const [email, setEmail] = useState("");

  // Result
  const [animating, setAnimating] = useState(false);
  const [animStep, setAnimStep] = useState(0);
  const [leadId, setLeadId] = useState<string | null>(null);

  // What-if
  const [wiArea, setWiArea] = useState(2400);
  const [wiFloors, setWiFloors] = useState<FloorsOpt>("G+1");
  const [wiFinish, setWiFinish] = useState<FinishQuality>("Standard");

  // Action modals
  const [waOpen, setWaOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [quoteRef, setQuoteRef] = useState<string | null>(null);
  const [visitOk, setVisitOk] = useState<string | null>(null);
  const [visitDate, setVisitDate] = useState("");
  const [quoteMsg, setQuoteMsg] = useState("");

  const engineInput = useMemo(
    () => ({ plotArea, builtUpArea: builtUp, floors, constructionType: toEngineType(construction), finishQuality: finish, stage: toEngineStage(stage) }),
    [plotArea, builtUp, floors, construction, finish, stage]
  );
  const result = useMemo(() => calculateEstimate(engineInput, rates), [engineInput, rates]);
  const wiResult = useMemo(
    () => calculateEstimate({ plotArea, builtUpArea: wiArea, floors: wiFloors, constructionType: toEngineType(construction), finishQuality: wiFinish, stage: toEngineStage(stage) }, rates),
    [plotArea, wiArea, wiFloors, construction, wiFinish, stage, rates]
  );

  const validMobile = /^[6-9]\d{9}$/.test(mobile.replace(/\D/g, "").slice(-10));

  function next() {
    if (step === 1 && (plotArea <= 0 || plotLen <= 0 || plotWid <= 0)) { toast("Check plot details", "Area, length and width must be greater than zero"); return; }
    if (step === 2 && builtUp <= 0) { toast("Check built-up area", "Built-up area must be greater than zero"); return; }
    setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function calculate() {
    if (!name.trim()) { toast("Please enter your name"); return; }
    if (!validMobile) { toast("Enter a valid 10-digit mobile number"); return; }
    setAnimating(true); setAnimStep(0); setDone(false);
    ANIM_STEPS.forEach((_, i) => setTimeout(() => setAnimStep(i), 550 * (i + 1)));
    setTimeout(() => {
      const res = calculateEstimate(engineInput, rates);
      const id = `LD-${1050 + Math.floor(Math.random() * 400)}`;
      addLead({
        id, name: name.trim(), phone: `+91 ${mobile.replace(/\D/g, "").slice(-10)}`,
        type: `${construction} Construction`, location: location.split(",")[0].trim() || location,
        value: res.total, source: "Website", status: "Estimate Generated", date: "Just now",
        plotArea, builtUpArea: builtUp, floors, constructionType: toEngineType(construction),
        finish, estimate: res.total, naksha: naksha ?? undefined,
      });
      setLeadId(id);
      setWiArea(builtUp); setWiFloors(floors);
      setAnimating(false); setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast("Estimate ready", "Your indicative estimate is below");
    }, 550 * ANIM_STEPS.length + 400);
  }

  function submitQuotation() {
    if (!visitDate) { toast("Pick a preferred site visit date"); return; }
    const ref = `DRC-QR-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setQuoteRef(ref);
    if (leadId) updateLead(leadId, { status: "Quotation Sent", quotationRef: ref, visitDate, message: quoteMsg || undefined });
    toast("Quotation requested", ref);
  }

  function submitVisit() {
    if (!visitDate) { toast("Pick a preferred date"); return; }
    setVisitOk(visitDate);
    if (leadId) updateLead(leadId, { visitDate });
    toast("Site visit booked", "Our engineer will call to confirm");
  }

  const waText = done
    ? `Hello D.R. Construction,\n\nI'm ${name || "a website visitor"}. My indicative estimate is ${inrFull(result.total)} (${inrFull(result.perSqft)}/sq.ft, ${num(builtUp)} sq.ft, ${floors}, ${finish}).\n\nPlease share a detailed quotation${naksha ? " — I've uploaded my Naksha" : ""}.\n\nThank you!`
    : `Hello D.R. Construction,\n\nI'd like a detailed quotation for my construction project.\n\nThank you!`;

  const cats = [
    { label: "Civil & Structure", v: result.civil }, { label: "Brick / Block Work", v: result.brick },
    { label: "Flooring / Plaster", v: result.flooring }, { label: "Electrical", v: result.electrical },
    { label: "Plumbing", v: result.plumbing }, { label: "Doors / Windows", v: result.doorsWindows },
    { label: "Painting", v: result.painting }, { label: "Other Finishing", v: result.other },
  ];
  const maxCat = Math.max(1, ...cats.map((c) => c.v));

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6">
        {!done ? (
          <>
            <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800"><ArrowLeft size={15} /> Back to Home</Link>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Get Your Free Estimate</h1>
            <p className="mt-1 text-sm text-slate-500">Five quick steps — your indicative cost in under a minute.</p>

            {/* Progress */}
            <div className="mt-5 flex items-center gap-1.5">
              {STEP_LABELS.map((l, i) => (
                <div key={l} className="flex flex-1 items-center gap-1.5">
                  <div className="flex-1">
                    <div className={cx("h-1.5 rounded-full", i <= step ? "bg-orange-500" : "bg-slate-200")} />
                    <p className={cx("mt-1 hidden text-[10px] font-bold sm:block", i <= step ? "text-orange-600" : "text-slate-400")}>{i + 1}. {l}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card fade-in mt-4 p-5 sm:p-7" key={step}>
              {step === 0 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 1 of 5 — Project Location</p>
                  <h2 className="mt-1 text-lg font-bold">Where are you building?</h2>
                  <div className="mt-4 space-y-3">
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Project Location</p>
                      <input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Raipur, Chhattisgarh" /></div>
                    <div className="map-grid flex h-36 items-center justify-center rounded-2xl border border-slate-200">
                      <div className="rounded-2xl border bg-white/90 px-4 py-2 text-center shadow-sm">
                        <p className="flex items-center gap-1 text-sm font-bold"><MapPin size={14} className="text-orange-600" /> {location || "Your location"}</p>
                        <p className="text-[11px] text-slate-500">Lat 21.2514 · Lng 81.6296 · Demo map preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 2 of 5 — Plot Details</p>
                  <h2 className="mt-1 text-lg font-bold">Tell us about your plot</h2>
                  <div className="mt-4 grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Plot Area (sq.ft)</p>
                      <input type="number" min={1} className={inputCls} value={plotArea} onChange={(e) => setPlotArea(Number(e.target.value))} /></div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Length (ft)</p>
                      <input type="number" min={1} className={inputCls} value={plotLen} onChange={(e) => setPlotLen(Number(e.target.value))} /></div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Width (ft)</p>
                      <input type="number" min={1} className={inputCls} value={plotWid} onChange={(e) => setPlotWid(Number(e.target.value))} /></div>
                  </div>
                  <button type="button" onClick={() => { setBoundary((b) => !b); if (!boundary) toast("Plot boundary drawn", `${num(plotArea)} sq.ft · ${num(2 * (plotLen + plotWid))} ft perimeter`); }}
                    className={cx("mt-3 w-full rounded-xl border border-dashed px-3 py-2.5 text-sm font-bold", boundary ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-slate-300 text-slate-500")}>
                    {boundary ? `✓ Boundary drawn — ${num(plotArea)} sq.ft · ${num(2 * (plotLen + plotWid))} ft perimeter` : "Draw Plot Boundary (optional)"}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 3 of 5 — Construction Details</p>
                  <h2 className="mt-1 text-lg font-bold">What do you want to build?</h2>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
                      <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Built-up Area (sq.ft)</p>
                        <input type="number" min={1} className={inputCls} value={builtUp} onChange={(e) => setBuiltUp(Number(e.target.value))} /></div>
                      <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Floors</p>
                        <select className={inputCls} value={floors} onChange={(e) => setFloors(e.target.value as FloorsOpt)}>
                          {(["Ground", "G+1", "G+2", "G+3+"] as FloorsOpt[]).map((f) => <option key={f}>{f}</option>)}
                        </select></div>
                    </div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Construction</p>
                      <Seg options={["Residential", "Commercial"] as ConstructionOpt[]} value={construction} onChange={setConstruction} /></div>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm"><Building2 size={15} className="text-slate-400" /><span className="font-semibold">Structure: RCC Framed</span><span className="text-xs text-slate-400">(standard for all our projects)</span></div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Finish</p>
                      <Seg options={["Standard", "Premium", "Luxury"] as FinishQuality[]} value={finish} onChange={setFinish} /></div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Stage</p>
                      <Seg options={["Complete", "Structure Only", "Finishing Only"] as StageOpt[]} value={stage} onChange={setStage} /></div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 4 of 5 — Naksha (optional)</p>
                  <h2 className="mt-1 text-lg font-bold">Have a drawing? Upload it.</h2>
                  <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) { setNaksha(f.name); toast("Naksha uploaded", "Technical Review Pending"); } }} />
                  {!naksha ? (
                    <div className="mt-4">
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center hover:border-orange-300">
                        <FileUp size={26} className="text-slate-400" />
                        <p className="mt-2 text-sm font-bold">Upload PDF, JPG or PNG</p>
                        <p className="text-xs text-slate-400">Helps us prepare an accurate BOQ later</p>
                      </button>
                      <button type="button" onClick={() => { setNaksha("Sharma_Residence_Naksha.pdf"); toast("Demo file attached"); }}
                        className="mt-2 w-full rounded-xl bg-slate-100 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200">Use demo file: Sharma_Residence_Naksha.pdf</button>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                      <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-800"><CheckCircle2 size={15} /> {naksha}</p>
                      <p className="mt-1 text-xs text-emerald-700">Uploaded · Technical Review Pending</p>
                      <button type="button" onClick={() => setNaksha(null)} className="mt-2 text-xs font-bold text-slate-500 underline">Remove</button>
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-2 rounded-2xl bg-violet-50 p-3 text-xs text-violet-700">
                    <Sparkles size={15} /><p><b>AI-Assisted Drawing Analysis — Coming Soon.</b> Every drawing is reviewed by our engineers before BOQ.</p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 5 of 5 — Your Details</p>
                  <h2 className="mt-1 text-lg font-bold">Where should we send your estimate?</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Name *</p>
                      <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" /></div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Mobile *</p>
                      <input className={inputCls} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="10-digit mobile" inputMode="numeric" /></div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">WhatsApp</p>
                      <input className={inputCls} value={sameWa ? mobile : whatsapp} disabled={sameWa} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp number" inputMode="numeric" /></div>
                    <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Email (optional)</p>
                      <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" inputMode="email" /></div>
                  </div>
                  <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" checked={sameWa} onChange={(e) => setSameWa(e.target.checked)} className="h-4 w-4 accent-orange-600" /> WhatsApp number is same as mobile
                  </label>
                  {animating && (
                    <div className="mt-4 space-y-1.5 rounded-2xl bg-slate-900 p-4">
                      {ANIM_STEPS.map((s, i) => (
                        <div key={s} className="flex items-center gap-2 text-xs">
                          <span className={cx("h-2 w-2 rounded-full", i <= animStep ? "bg-orange-400 calc-pulse" : "bg-white/20")} />
                          <span className={i <= animStep ? "font-semibold text-white" : "text-slate-500"}>{s}…</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex gap-2">
                {step > 0 && (
                  <button onClick={() => setStep((s) => s - 1)} className="btn-press rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">
                    <ArrowLeft size={15} className="inline" /> Back
                  </button>
                )}
                {step < 4 ? (
                  <button onClick={next} className="btn-press flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
                    Continue <ArrowRight size={15} />
                  </button>
                ) : (
                  <button onClick={calculate} disabled={animating} className="btn-press flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-orange-500 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/25 disabled:opacity-60">
                    <Calculator size={17} /> {animating ? "Calculating…" : "Calculate My Estimate"}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* RESULT */}
            <div className="fade-in rounded-3xl bg-slate-950 p-6 text-center sm:p-10">
              <p className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300"><BadgeCheck size={13} /> Estimate ready {leadId && `· ${leadId}`}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">{inrFull(result.total)}</p>
              <p className="mt-2 font-bold text-slate-200">Indicative Construction Estimate</p>
              <p className="text-sm text-slate-400">{inrFull(result.perSqft)} / sq.ft · {num(builtUp)} sq.ft · {floors} · {finish}</p>
              <p className="mx-auto mt-3 max-w-md text-[11px] leading-relaxed text-slate-500">Final costing is subject to drawings, site conditions, specifications and technical verification.</p>
            </div>

            <div className="card mt-4 p-5">
              <h3 className="font-bold text-slate-900">Cost Breakdown</h3>
              <div className="mt-3 space-y-2.5">
                {cats.map((c) => (
                  <div key={c.label}>
                    <div className="flex justify-between text-[13px]"><span className="font-medium text-slate-600">{c.label}</span><span className="font-bold">{inr(c.v)}</span></div>
                    <div className="mt-1 h-2 rounded-full bg-slate-100"><div className="progress-anim h-full rounded-full bg-orange-500" style={{ width: `${(c.v / maxCat) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-4 p-5">
              <div className="flex items-center justify-between"><h3 className="font-bold">Materials You&apos;ll Need</h3>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">Indicative quantities</span></div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {[
                  { l: "Cement", v: `${num(result.materials.cementBags)} bags` }, { l: "Steel", v: `${result.materials.steelTons} tons` },
                  { l: "Sand", v: `${num(result.materials.sandCft)} cu.ft` }, { l: "Aggregate", v: `${num(result.materials.aggregateCft)} cu.ft` },
                  { l: "Bricks", v: `${num(result.materials.bricks)} pcs` },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl bg-slate-50 p-3 text-center"><p className="text-[11px] font-bold text-slate-500">{m.l}</p><p className="mt-0.5 text-sm font-extrabold">{m.v}</p></div>
                ))}
              </div>
            </div>

            <div className="card mt-4 !border-violet-200 p-5">
              <h3 className="flex items-center gap-1.5 font-bold"><Sparkles size={16} className="text-violet-600" /> Adjust Your Budget</h3>
              <p className="text-xs text-slate-500">Change any input — your new estimate recalculates instantly.</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Built-up Area</p>
                  <input type="number" min={1} className={inputCls} value={wiArea} onChange={(e) => setWiArea(Number(e.target.value))} /></div>
                <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Floors</p>
                  <select className={inputCls} value={wiFloors} onChange={(e) => setWiFloors(e.target.value as FloorsOpt)}>
                    {(["Ground", "G+1", "G+2", "G+3+"] as FloorsOpt[]).map((f) => <option key={f}>{f}</option>)}
                  </select></div>
                <div><p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">Finish</p>
                  <select className={inputCls} value={wiFinish} onChange={(e) => setWiFinish(e.target.value as FinishQuality)}>
                    <option>Standard</option><option>Premium</option><option>Luxury</option>
                  </select></div>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-center min-[480px]:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">{finish}</p><p className="font-extrabold">{inr(result.total)}</p></div>
                <div className="rounded-xl bg-violet-50 p-3"><p className="text-[11px] text-violet-600">{wiFinish}</p><p className="font-extrabold text-violet-700">{inr(wiResult.total)}</p></div>
                <div className="rounded-xl bg-slate-900 p-3 text-white"><p className="text-[11px] text-slate-300">Difference</p><p className="font-extrabold">{inrFull(wiResult.total - result.total)}</p></div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="card mt-4 p-5">
              <h3 className="font-bold">Take the next step</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <button onClick={() => { setQuoteRef(null); setQuoteOpen(true); }} className="btn-press rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600">Get Detailed Quotation</button>
                <button onClick={() => { setVisitOk(null); setVisitOpen(true); }} className="btn-press inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"><CalendarCheck size={15} /> Book Site Visit</button>
                <button onClick={() => setWaOpen(true)} className="btn-press inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1fa855] px-4 py-3 text-sm font-bold text-white hover:bg-[#189346]"><MessageCircle size={15} /> Talk on WhatsApp</button>
                <button onClick={() => window.print()} className="btn-press inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"><Download size={15} /> Download Estimate</button>
              </div>
              {!naksha ? (
                <button onClick={() => { setDone(false); setStep(3); window.scrollTo({ top: 0 }); }} className="btn-press mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-bold text-slate-500">
                  <Upload size={15} /> Upload Naksha
                </button>
              ) : (
                <p className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700"><CheckCircle2 size={14} /> {naksha} · Technical Review Pending</p>
              )}
              <button onClick={() => { setDone(false); setStep(0); window.scrollTo({ top: 0 }); }} className="mt-2 w-full py-1 text-xs font-bold text-slate-400 hover:text-slate-600">Start over with different details</button>
            </div>

            {/* Printable estimate */}
            <div className="print-full mt-4 hidden rounded-2xl border bg-white p-6 print:block">
              <p className="text-lg font-black">D.R. CONSTRUCTION — From Plot to Project</p>
              <p className="text-sm">Indicative Estimate for {name} · {location}</p>
              <p className="mt-2 text-3xl font-black">{inrFull(result.total)} ({inrFull(result.perSqft)}/sq.ft)</p>
              {cats.map((c) => <p key={c.label} className="text-sm">{c.label}: {inrFull(c.v)}</p>)}
              <p className="mt-2 text-xs">Final costing subject to drawings, site conditions, specifications and technical verification.</p>
            </div>
          </>
        )}
      </main>

      <SiteFooter />

      {/* Quotation modal */}
      {quoteOpen && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/60 sm:items-center sm:p-6" onClick={() => setQuoteOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="slide-up thin-scroll max-h-[92dvh] w-full overflow-y-auto overscroll-contain bg-white p-5 max-sm:rounded-t-3xl sm:max-w-lg sm:rounded-3xl">
            {!quoteRef ? (
              <>
                <h3 className="text-base font-bold">Request Detailed Quotation</h3>
                <p className="mt-0.5 text-xs text-slate-500">Our engineer will call you back with a formal quotation.</p>
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-1 gap-3 min-[440px]:grid-cols-2">
                    <div><p className="mb-1 text-xs font-bold text-slate-500">NAME</p><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></div>
                    <div><p className="mb-1 text-xs font-bold text-slate-500">PHONE</p><input className={inputCls} value={mobile} onChange={(e) => setMobile(e.target.value)} /></div>
                  </div>
                  <div><p className="mb-1 text-xs font-bold text-slate-500">LOCATION</p><input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} /></div>
                  <div><p className="mb-1 text-xs font-bold text-slate-500">PREFERRED SITE VISIT DATE</p><input type="date" className={inputCls} value={visitDate} onChange={(e) => setVisitDate(e.target.value)} /></div>
                  <div><p className="mb-1 text-xs font-bold text-slate-500">MESSAGE (OPTIONAL)</p><textarea className={inputCls} rows={3} value={quoteMsg} onChange={(e) => setQuoteMsg(e.target.value)} placeholder="Anything we should know?" /></div>
                  <button onClick={submitQuotation} className="btn-press w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600">Submit Request</button>
                </div>
              </>
            ) : (
              <div className="py-4 text-center">
                <CheckCircle2 size={44} className="mx-auto text-emerald-500" />
                <h3 className="mt-3 text-lg font-black">Quotation Requested!</h3>
                <p className="mt-1 text-sm text-slate-500">Reference ID: <b className="text-slate-900">{quoteRef}</b></p>
                <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500">Our team will call {name || "you"} on +91 {mobile.replace(/\D/g, "").slice(-10)} shortly. Your enquiry is also visible to our owner team.</p>
                <button onClick={() => setQuoteOpen(false)} className="btn-press mt-4 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white">Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Site visit modal */}
      {visitOpen && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/60 sm:items-center sm:p-6" onClick={() => setVisitOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="slide-up thin-scroll max-h-[92dvh] w-full overflow-y-auto overscroll-contain bg-white p-5 max-sm:rounded-t-3xl sm:max-w-md sm:rounded-3xl">
            {!visitOk ? (
              <>
                <h3 className="flex items-center gap-1.5 text-base font-bold"><CalendarCheck size={17} /> Book a Free Site Visit</h3>
                <div className="mt-4 space-y-3">
                  <div><p className="mb-1 text-xs font-bold text-slate-500">PREFERRED DATE & TIME</p><input type="datetime-local" className={inputCls} value={visitDate} onChange={(e) => setVisitDate(e.target.value)} /></div>
                  <div><p className="mb-1 text-xs font-bold text-slate-500">SITE ADDRESS</p><input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} /></div>
                  <button onClick={submitVisit} className="btn-press w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white">Confirm Booking</button>
                </div>
              </>
            ) : (
              <div className="py-4 text-center">
                <CheckCircle2 size={44} className="mx-auto text-emerald-500" />
                <h3 className="mt-3 text-lg font-black">Site Visit Booked!</h3>
                <p className="mt-1 text-sm text-slate-500">We&apos;ll meet you on <b className="text-slate-900">{visitOk.replace("T", " at ")}</b></p>
                <button onClick={() => setVisitOpen(false)} className="btn-press mt-4 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white">Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      <WhatsAppModal open={waOpen} onClose={() => setWaOpen(false)} message={waText} />
    </div>
  );
}
