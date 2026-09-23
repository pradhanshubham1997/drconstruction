"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator, Copy, Download, PenTool, FileUp, MapPin, MessageCircle,
  Printer, Save, Share2, Sparkles, ClipboardList, CheckCircle2,
} from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, Field, Modal, PageHeader, inputCls } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { calculateEstimate, steelImpact } from "@/lib/estimate";
import { inr, inrFull, num, cx } from "@/lib/format";
import type { ConstructionStage, ConstructionType, FinishQuality } from "@/types";

const CALC_STEPS = ["Analyzing project", "Applying rate card", "Calculating materials", "Calculating labour", "Preparing estimate"];

export default function Estimator() {
  const { rates, toast } = useApp();
  const router = useRouter();

  const [location, setLocation] = useState("Raipur, Chhattisgarh");
  const [plotArea, setPlotArea] = useState(1500);
  const [plotLen, setPlotLen] = useState(50);
  const [plotWid, setPlotWid] = useState(30);
  const [boundary, setBoundary] = useState(false);
  const [builtUp, setBuiltUp] = useState(2400);
  const [floors, setFloors] = useState("G+1");
  const [ctype, setCtype] = useState<ConstructionType>("RCC Residential");
  const [finish, setFinish] = useState<FinishQuality>("Premium");
  const [stage, setStage] = useState<ConstructionStage>("Complete Construction");

  const [calculating, setCalculating] = useState(false);
  const [calcStep, setCalcStep] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof calculateEstimate> | null>(null);
  const [waOpen, setWaOpen] = useState(false);
  const [naksha, setNaksha] = useState(true);
  const [boq, setBoq] = useState<string | null>(null);

  // what-if
  const [wiArea, setWiArea] = useState(2400);
  const [wiFinish, setWiFinish] = useState<FinishQuality>("Standard");
  const [steelNew, setSteelNew] = useState(72);

  const perimeter = useMemo(() => 2 * (Number(plotLen) + Number(plotWid)), [plotLen, plotWid]);
  const input = useMemo(() => ({
    plotArea, builtUpArea: builtUp, floors, constructionType: ctype, finishQuality: finish, stage,
  }), [plotArea, builtUp, floors, ctype, finish, stage]);

  const wiResult = useMemo(() => calculateEstimate(
    { plotArea, builtUpArea: wiArea, floors, constructionType: ctype, finishQuality: wiFinish, stage }, rates,
  ), [plotArea, wiArea, floors, ctype, wiFinish, stage, rates]);

  function runCalc() {
    if (builtUp <= 0 || plotArea <= 0) { toast("Check inputs", "Plot and built-up area must be greater than zero"); return; }
    setCalculating(true); setCalcStep(0); setResult(null);
    CALC_STEPS.forEach((_, i) => setTimeout(() => setCalcStep(i), 450 * (i + 1)));
    setTimeout(() => {
      setResult(calculateEstimate(input, rates));
      setCalculating(false);
      toast("Estimate ready", "DRC-EST-2026-0048 · Indicative only");
    }, 450 * CALC_STEPS.length + 400);
  }

  const waText = `Hello Rahul,\n\nThank you for contacting D.R. Construction.\n\nYour indicative construction estimate for Sharma Residence is:\n\n${result ? inrFull(result.total) : "₹48,60,000"}\n\nWe can discuss the detailed quotation and site visit at your convenience.\n\nRegards,\nD.R. Construction`;

  const cats = result ? [
    { label: "Civil & Structure", v: result.civil }, { label: "Brick / Block Work", v: result.brick },
    { label: "Flooring / Plaster", v: result.flooring }, { label: "Electrical", v: result.electrical },
    { label: "Plumbing", v: result.plumbing }, { label: "Doors / Windows", v: result.doorsWindows },
    { label: "Painting", v: result.painting }, { label: "Other Finishing", v: result.other },
  ] : [];
  const maxCat = Math.max(1, ...cats.map((c) => c.v));

  return (
    <Shell>
      <PageHeader title="Construction Cost Estimator" sub="Generate an indicative project estimate in seconds."
        actions={<><Button variant="secondary" onClick={() => router.push("/settings/rates")}>Rate Card</Button><Button onClick={runCalc}><Calculator size={15} /> Calculate Estimate</Button></>} />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {/* STEP 1 */}
          <Card>
            <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 1 — Location</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Project Location"><input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} /></Field>
              <Field label="Search location"><input className={inputCls} placeholder="Search Sector 27, Raipur…" /></Field>
            </div>
            <div className="map-grid relative mt-3 overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex h-44 items-center justify-center">
                <div className="absolute left-1/3 top-1/4 h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_0_10px_rgba(249,115,22,.15)]" />
                <div className="rounded-2xl border bg-white/90 px-4 py-2 text-center shadow-sm backdrop-blur">
                  <p className="flex items-center gap-1 text-sm font-bold"><MapPin size={14} className="text-orange-600" /> {location}</p>
                  <p className="text-[11px] text-slate-500">Lat 21.2514 · Lng 81.6296 · Demo map preview</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t bg-white/80 px-4 py-2 text-[11px] text-slate-500 backdrop-blur">
                <span className="flex items-center gap-1"><MapPin size={12} /> Location Pin</span><span>Address: Sector 27, Raipur</span><span>Latitude 21.2514 · Longitude 81.6296</span>
              </div>
            </div>
          </Card>

          {/* STEP 2 */}
          <Card>
            <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 2 — Plot</p>
            <div className="mt-3 grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
              <Field label="Plot Area (sq.ft)"><input type="number" min={1} className={inputCls} value={plotArea} onChange={(e) => setPlotArea(Number(e.target.value))} /></Field>
              <Field label="Plot Length (ft)"><input type="number" min={1} className={inputCls} value={plotLen} onChange={(e) => setPlotLen(Number(e.target.value))} /></Field>
              <Field label="Plot Width (ft)"><input type="number" min={1} className={inputCls} value={plotWid} onChange={(e) => setPlotWid(Number(e.target.value))} /></Field>
            </div>
            <Button variant="secondary" className="mt-3" onClick={() => { setBoundary(true); toast("Plot boundary drawn", `Area ${num(plotArea)} sq.ft · Perimeter ${num(perimeter)} ft`); }}>
              <PenTool size={15} /> Draw Plot Boundary
            </Button>
            {boundary && (
              <div className="fade-in mt-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3 text-sm">
                <p className="font-bold text-emerald-800">Boundary captured (demo overlay)</p>
                <p className="text-emerald-700">Plot Area {num(plotArea)} sq.ft · Perimeter {num(perimeter)} ft</p>
                <p className="mt-1 text-[11px] text-emerald-600">A map pin alone doesn&apos;t determine legal plot dimensions — verified at site visit.</p>
              </div>
            )}
          </Card>

          {/* STEP 3 */}
          <Card>
            <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 3 — Construction</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="Built-up Area (sq.ft)"><input type="number" min={1} className={inputCls} value={builtUp} onChange={(e) => { setBuiltUp(Number(e.target.value)); setWiArea(Number(e.target.value)); }} /></Field>
              <Field label="Number of Floors">
                <select className={inputCls} value={floors} onChange={(e) => setFloors(e.target.value)}>
                  {["G+0", "G+1", "G+2", "G+3"].map((f) => <option key={f}>{f}</option>)}
                </select>
              </Field>
              <Field label="Construction Type">
                <select className={inputCls} value={ctype} onChange={(e) => setCtype(e.target.value as ConstructionType)}>
                  {(["RCC Residential", "RCC Commercial", "Load Bearing", "Steel Structure"] as ConstructionType[]).map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Finish Quality">
                <div className="grid grid-cols-3 gap-2">
                  {(["Standard", "Premium", "Luxury"] as FinishQuality[]).map((f) => (
                    <button key={f} onClick={() => setFinish(f)} className={cx("rounded-xl border px-2 py-2.5 text-xs font-bold leading-tight min-[420px]:text-sm", finish === f ? "border-orange-500 bg-orange-50 text-orange-700" : "border-slate-200 text-slate-500")}>{f}</button>
                  ))}
                </div>
              </Field>
              <Field label="Construction Stage">
                <select className={inputCls} value={stage} onChange={(e) => setStage(e.target.value as ConstructionStage)}>
                  {(["Complete Construction", "Structure Only", "Finishing Only"] as ConstructionStage[]).map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
          </Card>

          {/* STEP 4 */}
          <Card className="!border-orange-200 !bg-gradient-to-br !from-orange-50 !to-white">
            <p className="text-xs font-black uppercase tracking-wider text-orange-600">Step 4 — Calculate</p>
            <Button className="mt-3 w-full !py-3 !text-base" onClick={runCalc} disabled={calculating}>
              <Calculator size={17} /> {calculating ? CALC_STEPS[calcStep] + "…" : "Calculate Estimate"}
            </Button>
            {calculating && (
              <div className="mt-3 space-y-1.5">
                {CALC_STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-2 text-xs">
                    <span className={cx("h-2 w-2 rounded-full", i <= calcStep ? "bg-orange-500 calc-pulse" : "bg-slate-200")} />
                    <span className={i <= calcStep ? "font-semibold text-slate-800" : "text-slate-400"}>{s}</span>
                  </div>
                ))}
              </div>
            )}
            {result && (
              <div className="fade-in mt-4 rounded-2xl bg-slate-900 p-5 text-center text-white">
                <p className="text-3xl font-black tracking-tight sm:text-4xl">{inrFull(result.total)}</p>
                <p className="mt-1 text-sm text-slate-300">Indicative Project Estimate · {inrFull(result.perSqft)} / sq.ft</p>
                <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-slate-400">Indicative estimate. Final costing is subject to drawings, site conditions, specifications and technical verification.</p>
                <p className="mt-2 text-[11px] font-bold text-slate-300">Estimate ID: DRC-EST-2026-0048</p>
              </div>
            )}
          </Card>

          {result && (
            <>
              <Card>
                <h3 className="font-bold">Estimate Breakdown</h3>
                <div className="mt-3 space-y-2.5">
                  {cats.map((c) => (
                    <div key={c.label}>
                      <div className="flex justify-between text-[13px]"><span className="font-medium">{c.label}</span><span className="font-bold">{inr(c.v)}</span></div>
                      <div className="mt-1 h-2 rounded-full bg-slate-100"><div className="progress-anim h-full rounded-full bg-orange-500" style={{ width: `${(c.v / maxCat) * 100}%` }} /></div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between"><h3 className="font-bold">Material Estimate</h3><Badge tone="amber">Indicative Material Requirement</Badge></div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {[
                    { l: "Cement", v: `${num(result.materials.cementBags)} bags` },
                    { l: "Steel", v: `${result.materials.steelTons} tons` },
                    { l: "Sand", v: `${num(result.materials.sandCft)} cu.ft` },
                    { l: "Aggregate", v: `${num(result.materials.aggregateCft)} cu.ft` },
                    { l: "Bricks", v: `${num(result.materials.bricks)} pcs` },
                  ].map((m) => (
                    <div key={m.l} className="rounded-xl bg-slate-50 p-3 text-center"><p className="text-[11px] font-bold text-slate-500">{m.l}</p><p className="mt-0.5 text-sm font-extrabold">{m.v}</p></div>
                  ))}
                </div>
                <div className="mt-3 rounded-2xl border border-slate-200 p-3">
                  <p className="text-sm font-bold">Cost Impact</p>
                  <p className="text-xs text-slate-500">Steel current ₹{rates.steelPerKg}/kg → <input type="number" value={steelNew} onChange={(e) => setSteelNew(Number(e.target.value))} className="mx-1 w-16 rounded-lg border px-1.5 py-0.5 text-xs" /> /kg</p>
                  <p className="mt-1 text-sm font-extrabold text-red-600">Estimated Project Impact {steelImpact(steelNew, rates.steelPerKg, result.materials.steelTons) >= 0 ? "+" : ""}{inrFull(steelImpact(steelNew, rates.steelPerKg, result.materials.steelTons))}</p>
                </div>
              </Card>

              <Card className="!border-violet-200">
                <h3 className="flex items-center gap-1.5 font-bold"><Sparkles size={16} className="text-violet-600" /> What If?</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <Field label="Built-up Area"><input type="number" className={inputCls} value={wiArea} onChange={(e) => setWiArea(Number(e.target.value))} /></Field>
                  <Field label="Finish Quality">
                    <select className={inputCls} value={wiFinish} onChange={(e) => setWiFinish(e.target.value as FinishQuality)}>
                      <option>Standard</option><option>Premium</option><option>Luxury</option>
                    </select>
                  </Field>
                  <Field label="Stage"><select className={inputCls} value={stage} onChange={(e) => setStage(e.target.value as ConstructionStage)}><option>Complete Construction</option><option>Structure Only</option><option>Finishing Only</option></select></Field>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 text-center min-[480px]:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Current</p><p className="font-extrabold">{inr(result.total)}</p></div>
                  <div className="rounded-xl bg-violet-50 p-3"><p className="text-[11px] text-violet-600">New Estimate</p><p className="font-extrabold text-violet-700">{inr(wiResult.total)}</p></div>
                  <div className="rounded-xl bg-slate-900 p-3 text-white"><p className="text-[11px] text-slate-300">Difference</p><p className="font-extrabold">{inrFull(wiResult.total - result.total)}</p></div>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* SIDE RAIL */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold">Save Estimate</h3>
            <p className="text-xs text-slate-500">DRC-EST-2026-0048 · Rahul Sharma</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button className="!text-xs" onClick={() => toast("Estimate saved", "DRC-EST-2026-0048 saved to demo records")}><Save size={13} /> Save</Button>
              <Button variant="secondary" className="!text-xs" onClick={() => window.print()}><Printer size={13} /> PDF / Print</Button>
              <Button variant="secondary" className="!text-xs" onClick={() => toast("Share link copied", "Demo share link ready")}><Share2 size={13} /> Share</Button>
              <Button className="!bg-[#1fa855] !text-xs hover:!bg-[#189346]" onClick={() => setWaOpen(true)}><MessageCircle size={13} /> WhatsApp</Button>
              <Button variant="secondary" className="!text-xs" onClick={() => toast("Site visit requested", "Demo — assigned to D.R. Team")}><MapPin size={13} /> Site Visit</Button>
              <Button variant="dark" className="!text-xs" onClick={() => { setBoq("BOQ-2026-0048"); toast("BOQ requested", "Status: Technical Review Pending"); }}><ClipboardList size={13} /> Request BOQ</Button>
              <Button variant="secondary" className="col-span-2 !text-xs" onClick={() => router.push("/quotations")}><Download size={13} /> Create Quotation</Button>
            </div>
          </Card>

          <Card>
            <h3 className="flex items-center gap-1.5 font-bold"><FileUp size={16} /> Project Naksha</h3>
            <p className="mt-1 text-xs text-slate-500">PDF · JPG · PNG</p>
            {naksha ? (
              <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-sm">
                <p className="font-bold">Sharma_Residence_Naksha.pdf</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-700"><CheckCircle2 size={13} /> Uploaded · Technical Review Pending</p>
              </div>
            ) : <Button variant="secondary" className="mt-2 w-full !text-xs" onClick={() => setNaksha(true)}>Upload Naksha</Button>}
            <div className="mt-2 rounded-xl bg-violet-50 p-3 text-xs text-violet-700"><p className="font-bold">AI-Assisted Drawing Analysis</p><p>Coming Soon — drawing review required before BOQ.</p></div>
          </Card>

          <Card>
            <h3 className="font-bold">BOQ Request</h3>
            <div className="mt-2 space-y-1 text-xs text-slate-600">
              <p><b>Customer:</b> Rahul Sharma</p><p><b>Project:</b> Sharma Residence</p>
              <p><b>Built-up:</b> {num(builtUp)} sq.ft</p><p><b>Drawing:</b> Sharma_Residence_Naksha.pdf</p>
            </div>
            {boq ? <div className="mt-2 rounded-xl bg-amber-50 p-3 text-sm font-bold text-amber-800">{boq} · Technical Review Pending</div>
              : <Button className="mt-3 w-full !text-xs" onClick={() => { setBoq("BOQ-2026-0048"); toast("BOQ submitted", "Technical Review Pending"); }}>Submit BOQ Request</Button>}
          </Card>
        </div>
      </div>

      <Modal open={waOpen} onClose={() => setWaOpen(false)} title="WhatsApp Preview (demo)">
        <div className="rounded-2xl bg-[#e7ffdb] p-4 text-sm leading-relaxed whitespace-pre-line">{waText}</div>
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => { navigator.clipboard?.writeText(waText).catch(() => {}); toast("Message copied"); }}><Copy size={14} /> Copy Message</Button>
          <Button className="flex-1 !bg-[#1fa855] hover:!bg-[#189346]" onClick={() => { toast("Opening WhatsApp…", "Demo — no message actually sent"); setWaOpen(false); }}>Open WhatsApp</Button>
        </div>
      </Modal>
    </Shell>
  );
}
