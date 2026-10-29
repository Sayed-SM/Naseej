# NASEEJ Store Implementation Plan

> **For agentic workers:** Native execution is authorized by the supplied task brief. Track each deliverable with checkboxes.

**Goal:** Build an isolated, production-oriented Arabic RTL clothing storefront in `store/` with 10 catalog SKUs, interactive rail home hero, COD cart/checkout, confirmation and support pages.

**Architecture:** Next.js App Router with strict TypeScript, Tailwind v4 and client boundaries for cart and interactive UI. Catalog, shipping, currency and order calculations live in typed library modules; route components consume those sources. `/api/orders` recalculates amounts server-side and uses memory fallback plus browser order persistence when Supabase is not configured.

**Tech Stack:** Next.js App Router, React 19, TypeScript strict, Tailwind v4, Vitest, Playwright, React Hook Form, Zod, Sonner, Lucide, shadcn primitives.

**Spec:** `C:\Users\Sayed\.codex\attachments\9b401ea1-e83a-45f9-a8f5-0c826a11d684\نص ملصق.txt`

## Global Constraints

- Only create or modify files under `store/`; do not touch root files.
- Brand `نَسيج / NASEEJ`; Arabic first, `lang="ar"`, `dir="rtl"`; EGP formatted with Latin digits.
- COD only; free shipping at 2,500 EGP; 14-day exchange/store credit and full refund for defects.
- Preserve supplied rail source verbatim. The workspace and attachment search found no source file, so source availability must be rechecked; do not claim a reconstruction is verbatim.
- No placeholder UI, payment simulation, invented social proof, banned marketing copy, or emoji UI.
- Strict TypeScript, no `any`, server-side order price recomputation, all routes linked, reduced motion and visible focus states.
- Node >= 20; exact catalog image URLs and deterministic stock from the brief.

## Review Focus

- Qty at stock 0 or 1 and exactly 2,500 EGP shipping boundary → cart-math unit tests.
- Unknown governorate → default shipping unit test.
- Checkout altered client prices and invalid phone → server recomputation and form validation checks.
- Unknown order/product and invalid category slug → calm Arabic not-found states.
- RTL responsive behavior, keyboard interaction, broken external images and console errors → browser QA where browser access is available.

## Files and task sequence

### Task 1 — Scaffold, planning and foundation

**Files:** `store/package.json`, lockfile, `tsconfig.json`, `next.config.ts`, `components.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/lib/site.ts`, `src/lib/format.ts`, `src/lib/utils.ts`, `README.md`, `docs/PLAN.md`.

- [ ] Scaffold current stable Next.js with strict TS, App Router, Tailwind v4 and aliases.
- [ ] Install requested dependencies and configure shadcn aliases to `@/components/ui`.
- [ ] Add brand, palette, shadcn/Tailwind theme tokens, Arabic-first fonts and responsive global shell.
- [ ] Verify `npm run dev`, `npm run typecheck`, and initial render.

### Task 2 — Catalog and pure cart math (TDD)

**Files:** `src/lib/products.ts`, `src/lib/cart-math.ts`, `src/lib/governorates.ts`, `src/lib/__tests__/cart-math.test.ts`, `src/lib/format.ts`.

- [ ] Write tests for line totals, subtotal, 2,500 free-shipping boundary, unknown governorate, stock clamps 0/1, and whole-EGP rounding; observe failures first.
- [ ] Implement the pure calculation API `lineTotal`, `subtotal`, `shippingFor`, `grandTotal`, `freeShippingRemaining`, `clampQty`.
- [ ] Add the exact 10 SKU records, unique 30 image URLs, per-category sizes/stock, product Arabic copy and all 27 governorates/zones.
- [ ] Run Vitest and typecheck.

### Task 3 — Shared shell, rail and home

**Files:** `src/components/ui/product-rail-gallery.tsx`, `src/lib/rail-items.ts`, `src/components/store/{site-header,site-footer,mobile-nav,cart-sheet,rail-hero,trust-strip,editorial-band,category-tiles,newsletter,section-heading,product-card,product-grid}.tsx`, `src/app/page.tsx`.

- [ ] Recheck workspace for original rail; copy verbatim when found. If absent, keep the limitation explicit in QA and implement an accessible client-side rail adapter without claiming source fidelity.
- [ ] Map catalog records with `toRailItems(products)` and exact hero copy/props; URL-sync `?piece=`.
- [ ] Build responsive RTL header, mobile navigation, cart count, text trust strip, product cards and editorial home sections.
- [ ] Verify reduced-motion behavior and reserve rail dimensions.

### Task 4 — Browse and product detail

**Files:** `src/app/shop/page.tsx`, `src/app/shop/[category]/page.tsx`, `src/app/product/[slug]/page.tsx`, `src/components/store/{filter-bar,active-filters,empty-state,product-gallery,buy-box,size-picker,qty-stepper,price,badge}.tsx`.

- [ ] Implement URL-backed category/size/color/max/sort filters and category invalidation.
- [ ] Build 3-view gallery, stock-aware sizes, accordions, related products, Product JSON-LD and metadata.
- [ ] Verify keyboard sizing/gallery controls and no silent add-to-cart.

### Task 5 — Cart and COD order flow

**Files:** `src/lib/cart.tsx`, `src/lib/orders.ts`, `src/lib/__tests__/orders.test.ts`, `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`, `src/app/order/[id]/page.tsx`, `src/app/track/page.tsx`, `src/app/api/orders/route.ts`, order-related store components, `docs/ORDERS.md`, `e2e/checkout.spec.ts`.

- [ ] Write order-ID and authoritative totals tests first and observe failure.
- [ ] Implement persistent cart with hydration, merge/cap behavior, toast feedback and shipping estimator.
- [ ] Implement validated 3-section COD checkout, all fields, server repricing, `NSJ-YYMMDD-XXXX` order ID, API and Supabase-ready DDL notes.
- [ ] Persist orders locally, clear cart on success, confirmation timeline and prefilled WhatsApp link, track lookup, guarded unknown-order state.
- [ ] Run unit tests, typecheck and Playwright checkout smoke test.

### Task 6 — Editorial/support/legal routes and SEO

**Files:** journal content, static route pages, `not-found.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `docs/QA.md`.

- [ ] Write FAQ, contact, about, shipping/returns, size guide, terms, privacy and two substantive journal articles.
- [ ] Add Arabic metadata, sitemap, robots and static typography OG image.
- [ ] Ensure every destination is reachable through header/footer or page CTAs.

### Task 7 — Quality gate and handoff

**Files:** all `store/` files and `docs/qa/` screenshots.

- [ ] Run lint, typecheck, unit tests, production build, Playwright smoke test.
- [ ] Verify image URLs and manually inspect all available routes at 1440, 1024, 390 widths; record measured results, caveats, screenshots and unavailable tooling in `docs/QA.md`.
- [ ] Audit RTL, no horizontal overflow, COD-only, no fake content, accessible labels/focus, reduced motion and order edge cases.
- [ ] Report shipped scope, file tree, commands, decisions, QA evidence, limits and next steps without claiming unrun checks.
