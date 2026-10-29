import type { Product } from "./products";
export type { RailGarment } from "@/components/ui/product-rail-gallery";
import type { RailGarment } from "@/components/ui/product-rail-gallery";
export function toRailItems(products: Product[]): RailGarment[] {
  return products.map((product) => ({
    id: product.slug, name: `${product.nameAr} · ${product.colorAr}`, description: product.shortAr,
    image: product.images.front, backImage: product.images.back, sideImage: product.images.side,
    href: `/product/${product.slug}`, details: [product.fabricAr, product.fitAr, `مقاسات ${product.sizes.at(0)}–${product.sizes.at(-1)}`],
  }));
}
