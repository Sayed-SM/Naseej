"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductGrid } from "./product-grid";
import { ArrowUpLeft, Banknote, BookOpenText, Layers3, MessageCircle, RotateCcw, Shirt, PanelsTopLeft, Truck, Waves, Wind } from "lucide-react";
import { site } from "@/lib/site";

const serviceNotes = [
  { icon: Truck, label: "الشحن علينا من 2,500 ج.م." },
  { icon: RotateCcw, label: "استبدال خلال 14 يومًا" },
  { icon: Banknote, label: "الدفع عند الاستلام" },
];

/* ──────────────────────────────────────────────
   Trust Strip
   ────────────────────────────────────────────── */
export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="معلومات التسوق">
      <div className="trust-strip__viewport" aria-hidden="true">
        <div className="trust-strip__track">
          {[0, 1].map((copy) => (
            <div className="trust-strip__group" key={copy}>
              {serviceNotes.map(({ icon: Icon, label }) => (
                <span className="trust-strip__item" key={label}>
                  <span className="trust-strip__icon"><Icon size={17} strokeWidth={1.8} /></span>{label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="sr-only"><p>الشحن علينا للطلبات من 2,500 جنيه.</p><p>الاستبدال خلال 14 يومًا.</p><p>الدفع عند الاستلام.</p></div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Home Sections
   ────────────────────────────────────────────── */
export function HomeSections() {
  return (
    <>
      {/* Trust Strip */}
      <TrustStrip />

      {/* New Arrivals */}
      <section className="container-store section-pad border-t border-[var(--line)]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="page-title">وصل حديثًا</h2>
          <Link href="/shop" className="text-sm underline underline-offset-2 hover:text-[var(--ink)] transition-colors">
            كل القطع
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
        <ProductGrid items={products.slice(0, 4)} />
      </section>

      {/* Workshop Story */}
      <section className="relative my-4 min-h-[360px] overflow-hidden bg-[#ddd4c5] sm:min-h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=2000&q=80"
          alt="أقمشة قطنية في ورشة خياطة"
          fill
          sizes="100vw"
          priority
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,20,15,.6)] via-[rgba(21,20,15,.15)] to-transparent" />
        <div className="container-store relative flex min-h-[360px] flex-col items-start justify-end pb-10 text-white sm:min-h-[520px]">
          <p className="meta tracking-widest">من الورشة</p>
          <h2 className="arabic-display mt-2 max-w-2xl text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
            قطن نعرف وزنه قبل ما نقصّه.
          </h2>
          <Link
            className="mt-6 inline-flex items-center gap-2 underline underline-offset-4 hover:gap-3 transition-gap"
            href="/about"
          >
            عن طريقة شغلنا
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Browse by Category — Professional Cards */}
      <section className="container-store section-pad border-t border-[var(--line)]">
        <h2 className="page-title mb-8">تصفّح حسب القطعة</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "تيشيرتات", slug: "tees", icon: Shirt },
            { label: "قمصان", slug: "shirts", icon: PanelsTopLeft },
            { label: "تريكو", slug: "knitwear", icon: Layers3 },
            { label: "هوديز", slug: "hoodies", icon: Wind },
          ].map(({ label, slug, icon: Icon }) => (
            <Link
              key={slug}
              href={`/shop/${slug}`}
              className="category-card group"
            >
              <span className="category-card__top"><span className="category-card__icon"><Icon size={23} strokeWidth={1.55} aria-hidden="true" /></span><span className="meta">0{["tees", "shirts", "knitwear", "hoodies"].indexOf(slug) + 1}</span></span>
              <span className="category-card__title arabic-display">{label}</span>
              <span className="category-card__bottom"><span>استكشف المجموعة</span><ArrowUpLeft size={17} strokeWidth={1.7} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Journal Section */}
      <section className="container-store section-pad border-t border-[var(--line)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="meta tracking-widest">من الدفتر</p>
            <h2 className="page-title mt-2">ملاحظات من الاستخدام</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/journal/240gsm-cotton" className="journal-topic-link"><BookOpenText size={17} strokeWidth={1.7} aria-hidden="true" />عن القطن الـ240</Link>
            <Link
              href="/journal/knit-care"
              className="journal-topic-link"
            >
              <Waves size={17} strokeWidth={1.7} aria-hidden="true" />
              إزاي تغسل التريكو
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "عن القطن الـ240", icon: Layers3,
              excerpt: "ليش اخترنا 240 gsm للتيشيرتات الثقيلة، وإزاي الوزن بيأثر على المتانة والشكل مع الوقت.",
              href: "/journal/240gsm-cotton",
            },
            {
              title: "إزاي تغسل التريكو", icon: Waves,
              excerpt: "خطوات عملية للحفاظ على شكل وملمس قطع التريكو، من الغسيل للتجفيف للكي.",
              href: "/journal/knit-care",
            },
          ].map((article) => (
            <article
              key={article.href}
              className="journal-card group"
            >
              <span className="journal-card__icon"><article.icon size={24} strokeWidth={1.55} aria-hidden="true" /></span>
              <div className="journal-card__copy">
                <div>
                  <h3 className="arabic-display">{article.title}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] line-clamp-2">{article.excerpt}</p>
                </div>
                <Link
                  href={article.href}
                  className="journal-card__read"
                >
                  اقرأ المقال
                  <ArrowUpLeft size={15} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container-store border-t border-[var(--line)] py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="home-cta__eyebrow">
            <MessageCircle size={15} strokeWidth={1.8} aria-hidden="true" />
            مواعيد الدروب القادمة
          </div>
          <h2 className="arabic-display text-2xl sm:text-3xl font-medium">خليك في الصورة</h2>
          <p className="mt-3 text-sm text-[var(--ink-soft)] max-w-lg mx-auto">
            اسألنا عن المقاسات أو القطع المتاحة على واتساب. نرد بسرعة وببساطة.
          </p>
          <Link className="home-cta__button" href={`https://wa.me/${site.whatsapp.replace("+", "")}`} target="_blank" rel="noreferrer">
            <MessageCircle size={19} strokeWidth={1.7} aria-hidden="true" />راسلنا على واتساب<ArrowUpLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

