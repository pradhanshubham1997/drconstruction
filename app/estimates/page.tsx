"use client";
import { useRouter } from "next/navigation";
import { ArrowRight, Printer } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, PageHeader } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { calculateEstimate } from "@/lib/estimate";
import { inrFull } from "@/lib/format";

const ESTS = [
  { id: "DRC-EST-2026-0048", customer: "Rahul Sharma", area: 2400, finish: "Premium" as const, amount: 0, status: "Sent" },
  { id: "DRC-EST-2026-0047", customer: "Neha Patel", area: 3100, finish: "Luxury" as const, amount: 0, status: "Viewed" },
  { id: "DRC-EST-2026-0046", customer: "Amit Verma", area: 1900, finish: "Standard" as const, amount: 0, status: "Draft" },
];

export default function Estimates() {
  const { rates } = useApp();
  const router = useRouter();
  const rows = ESTS.map((e) => ({
    ...e,
    amount: calculateEstimate({ plotArea: 1500, builtUpArea: e.area, floors: "G+1", constructionType: "RCC Residential", finishQuality: e.finish, stage: "Complete Construction" }, rates).total,
  }));

  return (
    <Shell>
      <PageHeader title="Estimates" sub="Indicative estimates — subject to technical verification." actions={<Button onClick={() => router.push("/estimator")}>New Estimate</Button>} />
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm">
          <thead><tr className="border-b bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">{["Estimate", "Customer", "Built-up", "Finish", "Amount", "Status", ""].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0 hover:bg-slate-50/60">
              <td className="px-4 py-3 font-bold">{r.id}</td><td className="px-4 py-3">{r.customer}</td>
              <td className="px-4 py-3">{r.area} sq.ft</td><td className="px-4 py-3">{r.finish}</td>
              <td className="px-4 py-3 font-extrabold">{inrFull(r.amount)}</td>
              <td className="px-4 py-3"><Badge tone={r.status === "Sent" ? "green" : r.status === "Viewed" ? "blue" : "slate"}>{r.status}</Badge></td>
              <td className="px-4 py-3"><div className="flex gap-1.5">
                <Button variant="secondary" className="!px-2.5 !py-1.5 !text-xs" onClick={() => window.print()}><Printer size={13} /></Button>
                <Button className="!px-2.5 !py-1.5 !text-xs" onClick={() => router.push("/quotations")}>Quote <ArrowRight size={13} /></Button>
              </div></td>
            </tr>))}
          </tbody>
        </table></div>
      </Card>
      <p className="mt-3 text-[11px] text-slate-400">Demo calculation · All estimator math uses the central rate card.</p>
    </Shell>
  );
}
