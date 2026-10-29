"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import ClothingRailHero, { type ClothingRailHeroLabels } from "@/components/ui/product-rail-gallery";
import { products } from "@/lib/products";
import { toRailItems } from "@/lib/rail-items";

const railItems = toRailItems(products);
const AR_LABELS: ClothingRailHeroLabels = { front: "الأمام", back: "الخلف", close: "إغلاق", show: "اعرض", open: "افتح" };

export function RailHero() {
  const router = useRouter();
  const params = useSearchParams();
  const piece = params.get("piece");
  useEffect(() => {
    if (!piece) return;
    const target = document.querySelector(`[data-rail-piece="${CSS.escape(piece)}"]`);
    target?.scrollIntoView({ block: "center" });
  }, [piece]);

  return (
    <div className="min-h-[520px] sm:min-h-[620px]">
      <ClothingRailHero
        items={railItems}
        hanger="none"
        autoplay
        interval={3200}
        labels={AR_LABELS}
        initialOpenId={piece ?? undefined}
        eyebrow="DROP 01 · أساسيات يومية"
        heading="أساسيات يومية، بتفاصيل مدروسة."
        caption="حرّك الرف لاستكشاف القطع، واضغط على أي قطعة لعرض تفاصيلها."
        action={
          <div className="rail-hero__actions">
            <Link className="action-primary rail-hero__primary" href="/shop">اكتشف التشكيلة<ArrowUpLeft size={16} aria-hidden="true" /></Link>
            <Link className="action-secondary rail-hero__secondary" href="/size-guide">دليل المقاسات</Link>
          </div>
        }
        onOpenChange={(index) => {
          const next = new URL(window.location.href);
          if (index !== null && railItems[index]) next.searchParams.set("piece", railItems[index].id);
          else next.searchParams.delete("piece");
          router.replace(`${next.pathname}${next.search}`, { scroll: false });
        }}
      />
    </div>
  );
}
