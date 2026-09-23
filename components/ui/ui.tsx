import React from "react";
import { cx } from "@/lib/format";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("card p-5", className)}>{children}</div>;
}

export function StatCard({ label, value, sub, icon, accent }: { label: string; value: string; sub?: string; icon?: React.ReactNode; accent?: string }) {
  return (
    <div className="card card-hover p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
        </div>
        {icon && <div className={cx("rounded-xl p-2", accent ?? "bg-orange-50 text-orange-600")}>{icon}</div>}
      </div>
    </div>
  );
}

export function Badge({ tone = "slate", children }: { tone?: "slate" | "green" | "amber" | "red" | "blue" | "orange"; children: React.ReactNode }) {
  const map: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  };
  return <span className={cx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", map[tone])}>{children}</span>;
}

export function Button({ variant = "primary", className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "dark" }) {
  const styles = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-sm",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
  } as const;
  return <button {...props} className={cx("btn-press inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition disabled:opacity-50", styles[variant], className)} />;
}

export function PageHeader({ title, sub, actions }: { title: string; sub?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      <div className="rounded-2xl bg-slate-100 p-3 text-slate-400">∅</div>
      <p className="mt-3 font-semibold text-slate-800">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{desc}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded-xl bg-slate-200/70", className)} />;
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}
        className={`slide-up flex max-h-[92dvh] w-full flex-col overflow-hidden bg-white shadow-2xl max-sm:rounded-t-3xl sm:rounded-2xl ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"}`}>
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 p-4 sm:p-5 sm:pb-4">
          <h3 className="min-w-0 flex-1 break-words text-base font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl text-xl text-slate-400 hover:bg-slate-100">×</button>
        </div>
        <div className="thin-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 sm:pt-4">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

export const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";
