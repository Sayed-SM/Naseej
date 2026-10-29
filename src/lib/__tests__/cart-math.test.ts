import { describe, expect, it } from "vitest";
import { clampQty, freeShippingRemaining, grandTotal, lineTotal, shippingFor, subtotal } from "../cart-math";
import { products } from "../products";

describe("cart math", () => {
  it("calculates line and order totals using catalog prices", () => {
    const lines = [{ productId: "bone-tee", size: "M" as const, qty: 2 }];
    expect(lineTotal(lines[0], products[0])).toBe(2900);
    expect(subtotal(lines)).toBe(2900);
    expect(grandTotal(lines, "القاهرة")).toBe(2900);
  });

  it("makes shipping free at exactly 2,500 EGP", () => {
    expect(shippingFor("القاهرة", 2499)).toBe(60);
    expect(shippingFor("القاهرة", 2500)).toBe(0);
    expect(freeShippingRemaining(2499)).toBe(1);
    expect(freeShippingRemaining(2500)).toBe(0);
  });

  it("uses the default zone for an unknown governorate", () => {
    expect(shippingFor("مدينة غير معروفة", 0)).toBe(75);
  });

  it("clamps quantity to stock including zero and one", () => {
    expect(clampQty(4, 0)).toBe(0);
    expect(clampQty(4, 1)).toBe(1);
    expect(clampQty(-2, 5)).toBe(1);
  });

  it("rounds currency amounts to whole EGP", () => {
    expect(lineTotal({ productId: "bone-tee", size: "M", qty: 1 }, { ...products[0], price: 1450.6 })).toBe(1451);
  });
});
