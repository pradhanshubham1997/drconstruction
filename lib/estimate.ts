import type { EstimateInput, EstimateResult, RateCard } from "@/types";

export const DEFAULT_RATES: RateCard = {
  cementPerBag: 410,
  steelPerKg: 68,
  sandPer100Cft: 2800,
  aggregatePer100Cft: 3200,
  brickPerPiece: 9,
  flooringPerSqft: 145,
  electricalPerSqft: 150,
  plumbingPerSqft: 120,
  paintingPerSqft: 105,
  doorsWindowsPerSqft: 142,
  labourPerSqft: 310,
  civilPerSqft: 760,
};

export const FINISH_MULTIPLIER: Record<string, number> = {
  Standard: 1.0,
  Premium: 1.15,
  Luxury: 1.3,
};

export const STAGE_MULTIPLIER: Record<string, number> = {
  "Complete Construction": 1.0,
  "Structure Only": 0.58,
  "Finishing Only": 0.46,
};

export const TYPE_MULTIPLIER: Record<string, number> = {
  "RCC Residential": 1.0,
  "RCC Commercial": 1.12,
  "Load Bearing": 0.88,
  "Steel Structure": 1.18,
};

/**
 * Central estimation engine. ALL estimator calculations must use this.
 * Demo assumptions only — indicative, subject to technical verification.
 */
export function calculateEstimate(input: EstimateInput, rates: RateCard): EstimateResult {
  const builtUp = Math.max(0, input.builtUpArea || 0);
  const finishM = FINISH_MULTIPLIER[input.finishQuality] ?? 1;
  const stageM = STAGE_MULTIPLIER[input.stage] ?? 1;
  const typeM = TYPE_MULTIPLIER[input.constructionType] ?? 1;

  // Base per-sqft built from rate card components
  const basePerSqft =
    rates.civilPerSqft +
    rates.flooringPerSqft * 0.55 +
    rates.electricalPerSqft +
    rates.plumbingPerSqft +
    rates.paintingPerSqft +
    rates.doorsWindowsPerSqft +
    rates.labourPerSqft * 0.6 +
    125; // other / overhead demo constant

  const perSqft = Math.round(basePerSqft * finishM * stageM * typeM);
  const total = Math.round(builtUp * perSqft);

  // Category split (demo ratios, sum to ~1)
  const civil = Math.round(total * 0.375);
  const brick = Math.round(total * 0.086);
  const flooring = Math.round(total * 0.14);
  const electrical = Math.round(total * 0.074);
  const plumbing = Math.round(total * 0.06);
  const doorsWindows = Math.round(total * 0.07);
  const painting = Math.round(total * 0.051);
  const labour = Math.round(builtUp * rates.labourPerSqft * finishM * stageM);
  const other = Math.max(0, total - (civil + brick + flooring + electrical + plumbing + doorsWindows + painting));

  // Indicative material quantities scaled to built-up area (calibrated so 2400 sqft ≈ spec)
  const scale = builtUp / 2400;
  const cementBags = Math.round(1050 * scale * (input.finishQuality === "Luxury" ? 1.08 : input.finishQuality === "Standard" ? 0.94 : 1));
  const steelTons = Math.round(7.8 * scale * 10) / 10;
  const sandCft = Math.round(1420 * scale);
  const aggregateCft = Math.round(980 * scale);
  const bricks = Math.round(18500 * scale);

  return {
    total, perSqft,
    civil, brick, flooring, electrical, plumbing, doorsWindows, painting, other, labour,
    materials: { cementBags, steelTons, sandCft, aggregateCft, bricks },
  };
}

export function steelImpact(steelNew: number, steelBase: number, steelTons: number): number {
  return Math.round((steelNew - steelBase) * steelTons * 1000);
}
