"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products, type Category, type Size } from "@/lib/products";
import { ProductGrid } from "./product-grid";
import { formatEGP } from "@/lib/format";

const categories: Array<[Category, string]> = [["tees", "تيشيرتات"], ["shirts", "قمصان"], ["knitwear", "تريكو"], ["hoodies", "هوديز"]];

export function ShopBrowser({ category }: { category?: Category }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const cat = category ?? (params.get("cat") as Category | null);
  const size = params.get("size");
  const max = Number(params.get("max") ?? 10000);
  const sort = params.get("sort") ?? "newest";
  const color = params.get("color");
  const visible = useMemo(() => {
    const list = products.filter((product) =>
      (!cat || product.category === cat) &&
      (!size || (product.sizes.includes(size as Size) && product.stock[size as Size] > 0)) &&
      product.price <= max && (!color || product.colorAr === color)
    );
    if (sort === "asc") return list.sort((a, b) => a.price - b.price);
    if (sort === "desc") return list.sort((a, b) => b.price - a.price);
    return list;
  }, [cat, size, max, sort, color]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    startTransition(() => router.push(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  }

  const filters = [
    { key: "cat", label: "القسم", value: cat ?? "", disabled: !!category, options: categories.map(([value, label]) => ({ value, label })) },
    { key: "size", label: "المقاس", value: size ?? "", options: ["S", "M", "L", "XL", "XXL"].map((value) => ({ value, label: value })) },
    { key: "color", label: "اللون", value: color ?? "", options: products.map((product) => ({ value: product.colorAr, label: product.colorAr })) },
    { key: "max", label: "أقصى سعر", value: String(max), options: [1500, 2000, 2500, 10000].map((value) => ({ value: String(value), label: value === 10000 ? "كل الأسعار" : `حتى ${formatEGP(value)}` })) },
    { key: "sort", label: "ترتيب", value: sort, options: [{ value: "newest", label: "الأحدث" }, { value: "asc", label: "السعر: الأقل" }, { value: "desc", label: "السعر: الأعلى" }] },
  ];

  return (
    <>
      <section className="shop-filter-panel" aria-label="تصفية القطع">
        <div className="shop-filter-panel__heading"><SlidersHorizontal size={17} aria-hidden="true" /><h2>اختار اللي يناسبك</h2></div>
        <div className="shop-filters">
          {filters.map((filter) => <label className="shop-filter" key={filter.key}>
            <span>{filter.label}</span>
            <select value={filter.value} disabled={filter.disabled} onChange={(event) => update(filter.key, event.target.value === "10000" || (filter.key === "sort" && event.target.value === "newest") ? "" : event.target.value)}>
              {filter.key === "cat" && <option value="">كل الأقسام</option>}
              {filter.key === "size" && <option value="">كل المقاسات</option>}
              {filter.key === "color" && <option value="">كل الألوان</option>}
              {filter.options.map((option) => <option key={`${filter.key}-${option.value}`} value={option.value}>{option.label}</option>)}
            </select>
          </label>)}
        </div>
      </section>
      <div className="shop-results-bar">
        <p><strong>{visible.length}</strong> قطع</p>
        {params.size > 0 && <button className="shop-clear-filters" onClick={() => router.push(pathname)}><X size={15} aria-hidden="true" />مسح الفلاتر</button>}
      </div>
      {visible.length ? <ProductGrid items={visible} /> : <div className="shop-empty-state"><span className="meta">ما لقيناش حاجة</span><h2 className="arabic-display">مفيش قطع بالمواصفات دي</h2><p>جرّب تغيّر المقاس أو توسّع السعر.</p><button className="action-secondary mt-4" onClick={() => router.push(pathname)}>امسح الفلاتر</button></div>}
    </>
  );
}
