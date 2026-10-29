export function formatEGP(value: number): string {
  const amount = Math.round(Number.isFinite(value) ? value : 0).toLocaleString("en-US", { numberingSystem: "latn" });
  return `${amount} ج.م.`;
}
