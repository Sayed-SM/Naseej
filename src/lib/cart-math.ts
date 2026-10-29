import type { Product, Size } from "./products";
import { products } from "./products";
import { site } from "./site";
import { shippingZones } from "./governorates";

export type Line = { productId: string; size: Size; qty: number };
const productById = new Map(products.map((product) => [product.id, product]));
export function lineTotal(line: Line, product?: Product): number {
  const item = product ?? productById.get(line.productId);
  return item ? Math.round(item.price * Math.max(0, line.qty)) : 0;
}
export function subtotal(lines: Line[]): number { return Math.round(lines.reduce((sum, line) => sum + lineTotal(line), 0)); }
export function shippingFor(governorate: string | undefined, orderSubtotal: number): number {
  if (Math.round(orderSubtotal) >= site.freeShippingThreshold) return 0;
  return Math.round(shippingZones.find((zone) => zone.governorates.includes(governorate ?? ""))?.fee ?? 75);
}
export function grandTotal(lines: Line[], governorate?: string): number {
  const sum = subtotal(lines);
  return Math.round(sum + shippingFor(governorate, sum));
}
export function freeShippingRemaining(orderSubtotal: number): number {
  return Math.max(0, Math.round(site.freeShippingThreshold - Math.round(orderSubtotal)));
}
export function clampQty(qty: number, stock: number): number {
  return Math.min(Math.max(1, Math.round(Number.isFinite(qty) ? qty : 1)), Math.max(0, Math.floor(stock)));
}
