"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product, Size } from "@/lib/products";
import { Price } from "./price";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [size, setSize] = useState<Size | "">("");
  const [choosing, setChoosing] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const hasNewBadge = product.badges?.includes("new");
  const hasLastBadge = product.badges?.includes("last");

  function addToCart() {
    if (!size) return;
    add(product.id, size);
    setChoosing(false);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="product-card group">
      <Link href={`/product/${product.slug}`} className="product-card__media image-plate" aria-label={`تفاصيل ${product.nameAr}، لون ${product.colorAr}`}>
        <Image
          src={product.images.front}
          alt={product.nameAr}
          fill
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 25vw"
          className="product-card__image object-contain"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <Image
          src={product.images.back}
          alt=""
          fill
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 25vw"
          className="product-card__image product-card__image--back object-contain"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <span className="product-card__view" aria-hidden="true">عرض القطعة</span>
        {(hasNewBadge || hasLastBadge) && <span className={`product-card__badge${hasLastBadge ? " is-limited" : ""}`}>{hasLastBadge ? "كمية محدودة" : "وصل حديثًا"}</span>}
      </Link>
      <div className="product-card__info">
        <div className="product-card__title-row">
          <div className="min-w-0">
            <Link href={`/product/${product.slug}`} className="product-card__name">{product.nameAr}</Link>
            <p className="product-card__color"><span className="product-card__swatch" style={{ backgroundColor: product.colorHex }} aria-hidden="true" />{product.colorAr}</p>
          </div>
          <Price value={product.price} className="product-card__price" />
        </div>
        {choosing ? (
          <div className="product-card__purchase">
            <label className="sr-only" htmlFor={`size-${product.id}`}>اختار مقاس {product.nameAr}</label>
            <select id={`size-${product.id}`} className="product-card__size-select" value={size} onChange={(event) => setSize(event.target.value as Size)}>
              <option value="">المقاس</option>
              {product.sizes.map((item) => <option key={item} value={item} disabled={product.stock[item] === 0}>{item}{product.stock[item] === 1 ? " · آخر قطعة" : ""}</option>)}
            </select>
            <button type="button" className="store-button store-button--primary" disabled={!size} onClick={addToCart}>أضف للسلة</button>
          </div>
        ) : (
          <button type="button" className={`product-card__add${added ? " is-added" : ""}`} aria-expanded={choosing} onClick={() => { setChoosing(true); setAdded(false); }}>
            <span>{added ? "أُضيفت للسلة" : "اختار المقاس"}</span>{added ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
    </article>
  );
}
