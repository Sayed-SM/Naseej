"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { clampQty, freeShippingRemaining, grandTotal, shippingFor, subtotal, type Line } from "./cart-math";
import { products } from "./products";
import type { Size } from "./products";

type CartContextValue = { lines: Line[]; count: number; subtotal: number; hydrated: boolean; add: (productId: string, size: Size, qty?: number) => void; setQty: (productId: string, size: Size, qty: number) => void; remove: (productId: string, size: Size) => void; clear: () => void; shippingFor: (governorate?: string) => number; grandTotal: (governorate?: string) => number; freeShippingRemaining: number };
const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "naseej.cart.v1";
function normalizeLines(value: unknown): Line[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): Line[] => {
    if (typeof entry !== "object" || entry === null) return [];
    const row = entry as Record<string, unknown>;
    const product = products.find((item) => item.id === row.productId);
    if (!product || typeof row.size !== "string" || !product.sizes.includes(row.size as Size) || typeof row.qty !== "number") return [];
    const qty = clampQty(row.qty, product.stock[row.size as Size]);
    return qty > 0 ? [{ productId: product.id, size: row.size as Size, qty }] : [];
  });
}
export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { queueMicrotask(() => { try { setLines(normalizeLines(JSON.parse(localStorage.getItem(storageKey) ?? "[]") as unknown)); } catch { setLines([]); } setHydrated(true); }); }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(storageKey, JSON.stringify(lines)); }, [hydrated, lines]);
  const add = useCallback((productId: string, size: Size, qty = 1) => {
    const product = products.find((item) => item.id === productId);
    if (!product || product.stock[size] < 1) return;
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId && line.size === size);
      if (existing) return current.map((line) => line === existing ? { ...line, qty: clampQty(line.qty + qty, product.stock[size]) } : line);
      return [...current, { productId, size, qty: clampQty(qty, product.stock[size]) }];
    });
    toast("تمت الإضافة للسلة", { action: { label: "شوف السلة", onClick: () => router.push("/cart") } });
  }, [router]);
  const setQty = useCallback((productId: string, size: Size, qty: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setLines((current) => current.map((line) => line.productId === productId && line.size === size ? { ...line, qty: clampQty(qty, product.stock[size]) } : line));
  }, []);
  const remove = useCallback((productId: string, size: Size) => setLines((current) => current.filter((line) => line.productId !== productId || line.size !== size)), []);
  const clear = useCallback(() => setLines([]), []);
  const value = useMemo<CartContextValue>(() => {
    const sum = subtotal(lines);
    return { lines, count: hydrated ? lines.reduce((total, line) => total + line.qty, 0) : 0, subtotal: sum, hydrated, add, setQty, remove, clear, shippingFor: (governorate) => shippingFor(governorate, sum), grandTotal: (governorate) => grandTotal(lines, governorate), freeShippingRemaining: freeShippingRemaining(sum) };
  }, [lines, hydrated, add, setQty, remove, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(): CartContextValue { const cart = useContext(CartContext); if (!cart) throw new Error("useCart must be used inside CartProvider"); return cart; }
