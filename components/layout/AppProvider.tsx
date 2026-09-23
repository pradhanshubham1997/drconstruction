"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lead, RateCard } from "@/types";
import { DEFAULT_RATES } from "@/lib/estimate";
import { leads as seedLeads } from "@/data/demo";

interface Toast { id: number; title: string; desc?: string; }
interface AppCtx {
  rates: RateCard;
  setRates: (r: RateCard) => void;
  toasts: Toast[];
  toast: (title: string, desc?: string) => void;
  search: string;
  setSearch: (s: string) => void;
  leads: Lead[];
  addLead: (l: Lead) => void;
  updateLead: (id: string, patch: Partial<Lead>) => void;
}

const Ctx = createContext<AppCtx | null>(null);
const LEADS_KEY = "drc-os-leads-v1";

function loadLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (!raw) return seedLeads;
    const parsed = JSON.parse(raw) as Lead[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seedLeads;
    // Merge: seed leads first unless a stored lead shares the id (stored wins)
    const storedIds = new Set(parsed.map((l) => l.id));
    const missing = seedLeads.filter((l) => !storedIds.has(l.id));
    return [...parsed, ...missing];
  } catch {
    return seedLeads;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState<RateCard>(DEFAULT_RATES);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate customer-submitted leads after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLeads(loadLeads());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    } catch { /* storage unavailable — demo continues in memory */ }
  }, [leads, hydrated]);

  const toast = useCallback((title: string, desc?: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, desc }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  const addLead = useCallback((l: Lead) => {
    setLeads((prev) => [l, ...prev]);
  }, []);

  const updateLead = useCallback((id: string, patch: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }, []);

  const value = useMemo(
    () => ({ rates, setRates, toasts, toast, search, setSearch, leads, addLead, updateLead }),
    [rates, toasts, toast, search, leads, addLead, updateLead]
  );
  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex w-[calc(100vw-2.5rem)] max-w-xs flex-col gap-2 print-hidden">
        {toasts.map((t) => (
          <div key={t.id} className="card slide-up w-full border-l-4 !border-l-emerald-500 p-3.5">
            <p className="text-sm font-semibold text-slate-900">{t.title}</p>
            {t.desc && <p className="text-xs text-slate-500 mt-0.5">{t.desc}</p>}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useApp(): AppCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp outside provider");
  return ctx;
}
