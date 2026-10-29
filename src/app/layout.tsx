import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Instrument_Serif, Noto_Kufi_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { CartProvider } from "@/lib/cart";
import { site } from "@/lib/site";
import { Toaster } from "sonner";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-ibm-plex-arabic" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], display: "swap", variable: "--font-ibm-mono" });
const display = Instrument_Serif({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-instrument-serif" });
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], weight: ["600", "700"], display: "swap", variable: "--font-noto-kufi" });
const naskh = Noto_Naskh_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-noto-naskh" });

export const metadata: Metadata = { title: { default: `${site.brandAr} — ملابس تُلبَس كل يوم.`, template: `%s — ${site.brandAr}` }, description: "ملابس قطنية للاستخدام اليومي، بتفاصيل واضحة ومقاسات مدروسة.", metadataBase: new URL(site.siteUrl) };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${arabic.variable} ${mono.variable} ${display.variable} ${kufi.variable} ${naskh.variable}`}><body><CartProvider><SiteHeader />{children}<SiteFooter /><Toaster dir="rtl" position="bottom-left" /></CartProvider></body></html>;
}
