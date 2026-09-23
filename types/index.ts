export type FinishQuality = "Standard" | "Premium" | "Luxury";
export type ConstructionType = "RCC Residential" | "RCC Commercial" | "Load Bearing" | "Steel Structure";
export type ConstructionStage = "Complete Construction" | "Structure Only" | "Finishing Only";

export interface RateCard {
  cementPerBag: number;
  steelPerKg: number;
  sandPer100Cft: number;
  aggregatePer100Cft: number;
  brickPerPiece: number;
  flooringPerSqft: number;
  electricalPerSqft: number;
  plumbingPerSqft: number;
  paintingPerSqft: number;
  doorsWindowsPerSqft: number;
  labourPerSqft: number;
  civilPerSqft: number;
}

export interface EstimateInput {
  plotArea: number;
  builtUpArea: number;
  floors: string;
  constructionType: ConstructionType;
  finishQuality: FinishQuality;
  stage: ConstructionStage;
}

export interface EstimateResult {
  total: number;
  perSqft: number;
  civil: number;
  brick: number;
  flooring: number;
  electrical: number;
  plumbing: number;
  doorsWindows: number;
  painting: number;
  other: number;
  labour: number;
  materials: {
    cementBags: number;
    steelTons: number;
    sandCft: number;
    aggregateCft: number;
    bricks: number;
  };
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  type: string;
  location: string;
  value: number;
  source: string;
  status: string;
  date: string;
  plotArea?: number;
  builtUpArea?: number;
  floors?: string;
  constructionType?: string;
  finish?: string;
  estimate?: number;
  naksha?: string;
  quotationRef?: string;
  visitDate?: string;
  message?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  project: string;
  location: string;
  value: number;
  status: string;
  progress: number;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  type: string;
  location: string;
  customer: string;
  value: number;
  received: number;
  pending: number;
  progress: number;
  status: string;
}

export interface Quotation {
  id: string;
  customer: string;
  project: string;
  amount: number;
  status: string;
  created: string;
}
