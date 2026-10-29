import { products, type Size } from "./products";
import { shippingZones } from "./governorates";
import { shippingFor, type Line } from "./cart-math";
export type OrderTotals = { subtotal: number; shipping: number; total: number; eta: string };
export type OrderInput = Line[];
const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export function createOrderId(date = new Date(), random = Math.random()): string {
  const yy = String(date.getUTCFullYear()).slice(-2); const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); const dd = String(date.getUTCDate()).padStart(2, "0");
  let value = Math.floor(Math.min(0.999999999, Math.max(0, random)) * 32 ** 4); let suffix = "";
  for (let index = 0; index < 4; index += 1) { suffix = alphabet[value % 32] + suffix; value = Math.floor(value / 32); }
  return `NSJ-${yy}${mm}${dd}-${suffix}`;
}
export function calculateOrder(lines: OrderInput, governorate: string): OrderTotals {
  if (lines.length === 0) throw new Error("السلة فاضية");
  const sum = lines.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    if (!product || !product.sizes.includes(line.size as Size) || product.stock[line.size] < line.qty || line.qty < 1) throw new Error("المقاس غير متاح");
    return total + product.price * line.qty;
  }, 0);
  const shipping = shippingFor(governorate, sum);
  const eta = shippingZones.find((zone) => zone.governorates.includes(governorate))?.eta ?? "2–3 أيام";
  return { subtotal: Math.round(sum), shipping, total: Math.round(sum + shipping), eta };
}
export type Order = OrderTotals & { id: string; createdAt: string; lines: Line[]; customer: { name: string; phone: string; governorate: string; city: string; address: string }; status: "تم استلام الطلب" };
const orderStore = new Map<string, Order>();
export function saveOrder(order: Order): void { orderStore.set(order.id, order); }
export function findOrder(id: string): Order | undefined { return orderStore.get(id); }
