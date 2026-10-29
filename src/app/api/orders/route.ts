import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateOrder, createOrderId, saveOrder, type Order } from "@/lib/orders";
import { products } from "@/lib/products";
const lineSchema = z.object({ productId: z.string(), size: z.enum(["S", "M", "L", "XL", "XXL"]), qty: z.number().int().min(1).max(12) });
const inputSchema = z.object({ lines: z.array(lineSchema).min(1), customer: z.object({ name: z.string().trim().min(3).max(60), phone: z.string().regex(/^01[0125][0-9]{8}$/), governorate: z.string(), city: z.string().trim().min(2).max(40), address: z.string().trim().min(10).max(200), alternatePhone: z.string().regex(/^01[0125][0-9]{8}$/).optional().or(z.literal("")), landmark: z.string().max(80).optional(), notes: z.string().max(300).optional() }) });
export async function POST(request: Request) {
  const parsed = inputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !products.length) return NextResponse.json({ error: "راجِع البيانات وحاول تاني." }, { status: 400 });
  try {
    const totals = calculateOrder(parsed.data.lines, parsed.data.customer.governorate);
    const order: Order = { id: createOrderId(), createdAt: new Date().toISOString(), lines: parsed.data.lines, customer: parsed.data.customer, ...totals, status: "تم استلام الطلب" };
    saveOrder(order);
    if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_SUPABASE_URL) console.info("Order stored in process memory; configure Supabase for durable orders.");
    return NextResponse.json({ id: order.id, total: order.total, shipping: order.shipping, eta: order.eta });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر تسجيل الطلب." }, { status: 400 }); }
}
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  const { findOrder } = await import("@/lib/orders"); const order = id ? findOrder(id) : undefined;
  return order ? NextResponse.json(order) : NextResponse.json({ error: "مش لاقيين الطلب ده." }, { status: 404 });
}
