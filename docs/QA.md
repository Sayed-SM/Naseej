# QA status

## Automated checks

- `npm run typecheck` — **PASS**.
- `npm run lint` — **PASS**.
- `npm run test` — **PASS**, 8 tests across cart math and order pricing/validation.
- `npm run build` — **PASS**, Next.js 16.4.3 production build with webpack.
- `npm run test:e2e` — checkout smoke, rail keyboard/focus, and out-of-stock tests pass. The 24-route responsive sweep captures screenshots at 1440, 1024, and 390 px but currently fails its strict console assertion due to a Next.js LCP warning for the rail image `096002…webp`; it reports no runtime errors in the run. The warning persisted after changing rail photos to native `<img>` loading attributes and remains unresolved.

## Browser and image checks

- Playwright captured **72 screenshots** (24 paths × 3 widths) under `docs/qa/`.
- Latest home metrics: 862,003 bytes of same-origin JavaScript transferred, CLS 0, and 1440 px document width at a 1440 px viewport. Earlier responsive run passed the 320 px no-horizontal-overflow check; the strict final route run exits at its warning assertion before that check.
- 32 remote image URLs (30 catalog images and 2 Unsplash images) returned HTTP 200 when checked.
- Lighthouse was not run. Browser MCP was unavailable; Playwright was used for browser coverage.
- The supplied `ClothingRailHero` source was not present in the workspace or attachment directory. The rail is a newly authored substitute and cannot be verified against the requested component's physics or behavior.

## Known implementation gaps

- Orders are held in process memory and browser local storage; no durable Supabase adapter or cross-device lookup is configured. The order API reprices against the catalog, and `docs/ORDERS.md` includes proposed Supabase DDL.
- WhatsApp details are placeholders, no support email is configured, and the public site URL must be set with `NEXT_PUBLIC_SITE_URL`.
- shadcn configuration is present, but its requested primitive set was not generated; repeated CLI attempts could not reach the npm registry (`ECONNRESET`). Controls currently use native HTML.
- The homepage links to WhatsApp for drop inquiries; a persistent mailing-list signup is not implemented.
