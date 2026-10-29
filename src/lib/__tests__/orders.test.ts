import { describe, expect, it } from "vitest";
import { createOrderId, calculateOrder } from "../orders";

describe("orders", () => {
  it("creates dated base32 order ids without ambiguous characters", () => {
    expect(createOrderId(new Date("2026-10-27T12:00:00Z"), 0)).toBe("NSJ-261027-2222");
    expect(createOrderId(new Date("2026-10-27T12:00:00Z"), 0.5)).toMatch(/^NSJ-261027-[A-HJ-NP-Z2-9]{4}$/);
  });
  it("recomputes line amounts from product ids", () => {
    expect(calculateOrder([{ productId: "bone-tee", size: "M", qty: 2 }], "القاهرة")).toEqual({ subtotal: 2900, shipping: 0, total: 2900, eta: "1–2 يوم" });
  });
  it("rejects unavailable quantities", () => {
    expect(() => calculateOrder([{ productId: "bone-tee", size: "XXL", qty: 1 }], "القاهرة")).toThrow("المقاس غير متاح");
  });
});
