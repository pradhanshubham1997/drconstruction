"use client";
import { useState } from "react";
import { Save } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button, Card, Field, PageHeader, inputCls } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import type { RateCard } from "@/types";

const FIELDS: { key: keyof RateCard; label: string; suffix: string }[] = [
  { key: "cementPerBag", label: "Cement", suffix: "/ bag" },
  { key: "steelPerKg", label: "Steel", suffix: "/ kg" },
  { key: "sandPer100Cft", label: "Sand", suffix: "/ 100 cu.ft" },
  { key: "aggregatePer100Cft", label: "Aggregate", suffix: "/ 100 cu.ft" },
  { key: "brickPerPiece", label: "Bricks", suffix: "/ piece" },
  { key: "flooringPerSqft", label: "Flooring", suffix: "/ sq.ft" },
  { key: "electricalPerSqft", label: "Electrical", suffix: "/ sq.ft" },
  { key: "plumbingPerSqft", label: "Plumbing", suffix: "/ sq.ft" },
  { key: "paintingPerSqft", label: "Painting", suffix: "/ sq.ft" },
  { key: "doorsWindowsPerSqft", label: "Doors / Windows", suffix: "/ sq.ft" },
  { key: "labourPerSqft", label: "Labour", suffix: "/ sq.ft" },
  { key: "civilPerSqft", label: "Civil & Structure", suffix: "/ sq.ft" },
];

export default function Rates() {
  const { rates, setRates, toast } = useApp();
  const [draft, setDraft] = useState<RateCard>({ ...rates });
  const [saved, setSaved] = useState(false);
  return (
    <Shell>
      <PageHeader title="Rate Card" sub="Central rate configuration — every estimate uses this. Demo values."
        actions={<Button onClick={() => { setRates({ ...draft }); setSaved(true); toast("Rate card saved", "Estimator now uses updated rates"); }}><Save size={15} /> Save Rate Card</Button>} />
      <Card>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {FIELDS.map((f) => (
            <Field key={f.key} label={`${f.label} (₹ ${f.suffix})`}>
              <input type="number" min={0} className={inputCls} value={draft[f.key]}
                onChange={(e) => { setDraft({ ...draft, [f.key]: Math.max(0, Number(e.target.value)) }); setSaved(false); }} />
            </Field>
          ))}
        </div>
        <div className="mt-4 grid gap-2 rounded-2xl bg-slate-50 p-3 text-xs sm:grid-cols-3">
          <div><p className="font-bold text-slate-400">FINISH MULTIPLIERS (demo)</p><p>Standard 1.0 · Premium 1.15 · Luxury 1.30</p></div>
          <div><p className="font-bold text-slate-400">STAGE</p><p>Complete 1.0 · Structure 0.58 · Finishing 0.46</p></div>
          <div><p className="font-bold text-slate-400">STATUS</p><p className={saved ? "font-bold text-emerald-600" : "text-slate-500"}>{saved ? "✓ Saved — estimator updated" : "Unsaved changes"}</p></div>
        </div>
      </Card>
    </Shell>
  );
}
