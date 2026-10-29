"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { products, getProduct, type Size } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Price } from "@/components/store/price";

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const [size, setSize] = useState<Size | "">("");
  const [photo, setPhoto] = useState(0);
  const { add } = useCart();
  if (!product) notFound();

  const images = [product.images.front, product.images.back, product.images.side];
  const captions = ["أمامي", "خلفي", "جانبي"];
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: `${product.nameAr} · ${product.colorAr}`,
    description: product.longAr, image: images, sku: product.id,
    offers: { "@type": "Offer", priceCurrency: "EGP", price: product.price, availability: Object.values(product.stock).some((quantity) => quantity > 0) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
  };

  return (
    <main className="container-store section-pad product-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="product-detail__breadcrumb" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><span aria-hidden="true"> / </span><Link href="/shop">المتجر</Link><span aria-hidden="true"> / </span>{product.nameAr}</nav>
      <div className="product-detail__layout">
        <div className="product-detail__gallery" role="group" aria-label="صور القطعة" onKeyDown={(event) => { if (event.key === "ArrowLeft") setPhoto((current) => (current + 1) % 3); if (event.key === "ArrowRight") setPhoto((current) => (current + 2) % 3); }}>
          {images.map((src, index) => (
            <button key={src} type="button" className={`product-detail__photo-button image-plate${photo === index ? " is-selected" : ""}`} onClick={() => setPhoto(index)} aria-label={`عرض الصورة ${captions[index]}`} aria-pressed={photo === index}>
              <Image src={src} alt={`${product.nameAr} — ${captions[index]}`} fill sizes="(max-width: 640px) 90vw, 30vw" className="object-contain p-5" priority={index === 0} loading={index === 0 ? "eager" : "lazy"} />
              <span className="meta product-detail__photo-label">{captions[index]}</span>
            </button>
          ))}
        </div>
        <div className="product-detail__buybox">
          <p className="meta product-detail__eyebrow">DROP 01 — الأساسيات</p>
          <h1 className="page-title product-detail__title">{product.nameAr}<span> · {product.colorAr}</span></h1>
          <div className="product-detail__price-row"><Price value={product.price} /><span>شامل الضريبة</span></div>
          <p className="product-detail__description">{product.shortAr}</p>
          <p className="product-detail__fabric">{product.fabricAr}<span aria-hidden="true"> · </span>{product.fitAr}</p>
          <fieldset className="product-detail__sizes">
            <legend>اختار المقاس <Link href="/size-guide">دليل المقاسات</Link></legend>
            <div className="product-detail__size-list">{product.sizes.map((item) => (
              <button key={item} type="button" disabled={product.stock[item] === 0} aria-pressed={size === item} onClick={() => setSize(item)} className={`product-detail__size meta${size === item ? " is-selected" : ""}`}>
                {item}{product.stock[item] === 1 && <small>آخر قطعة</small>}
              </button>
            ))}</div>
          </fieldset>
          <button className="action-primary product-detail__add" disabled={!size} onClick={() => { if (size) add(product.id, size); }}>{size ? "أضف للسلة" : "اختار المقاس"}</button>
          <div className="product-detail__accordions">{[["التفاصيل", product.longAr], ["المقاسات والقصّة", `${product.fitAr}. راجع دليل المقاسات لاختيار القياس الأقرب.`], ["الشحن والاستبدال", "الشحن من يوم إلى 6 أيام حسب المحافظة. الاستبدال أو رصيد المتجر خلال 14 يومًا؛ والعيب يُرد كامل المبلغ."]].map(([title, body]) => (
            <details key={title}><summary>{title}</summary><p>{body}</p></details>
          ))}</div>
        </div>
      </div>
      {related.length > 0 && <section className="product-detail__related"><div className="product-detail__related-heading"><p className="meta">كمّل الإطلالة</p><h2 className="page-title">من نفس المجموعة</h2></div><div className="grid grid-cols-2 gap-4 md:grid-cols-3">{related.map((item) => <Link href={`/product/${item.slug}`} key={item.id}>{item.nameAr}<span> · {item.colorAr}</span></Link>)}</div></section>}
    </main>
  );
}
