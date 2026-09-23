export function inr(n: number): string {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)}L`;
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function inrFull(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function num(n: number): string {
  return n.toLocaleString("en-IN");
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
