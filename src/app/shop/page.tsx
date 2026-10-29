import { Suspense } from "react"; import type { Metadata } from "next"; import { ShopBrowser } from "@/components/store/shop-browser";
export const metadata: Metadata = { title: "المتجر", description: "كل قطع نسيج في مكان واحد." };
export default function ShopPage() { return <main className="container-store section-pad"><p className="meta">DROP 01 — الأساسيات</p><h1 className="page-title mb-6 mt-2">كل القطع</h1><Suspense fallback={<div className="min-h-96"/>}><ShopBrowser /></Suspense></main>; }
