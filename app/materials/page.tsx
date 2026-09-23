"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge, Button, Card, PageHeader } from "@/components/ui/ui";
import { useApp } from "@/components/layout/AppProvider";
import { materials as seed } from "@/data/demo";

export default function Materials() {
  const { toast } = useApp();
  const [list, setList] = useState(seed);
  return (
    <Shell>
      <PageHeader title="Materials" sub="Required vs available vs used — demo site stock." actions={<Button onClick={() => toast("Purchase request created", "Demo — sent to supplier")}><Plus size={15} /> Create Purchase Request</Button>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((m) => (
          <Card key={m.name} className="card-hover">
            <div className="flex items-start justify-between"><p className="font-bold">{m.name}</p><Badge tone={m.tone as "red" | "green" | "amber"}>{m.status}</Badge></div>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <p>Required: <b className="text-slate-800">{m.required}</b></p>
              <p>Available: <b className="text-slate-800">{m.available}</b></p>
              <p>Used: <b className="text-slate-800">{m.used}</b></p>
            </div>
            <Button variant="secondary" className="mt-3 w-full !py-1.5 !text-xs" onClick={() => { setList(list.map((x) => x.name === m.name ? { ...x, status: "In Stock", tone: "green" } : x)); toast("Stock updated", `${m.name} — demo restock`); }}>Update Stock</Button>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
