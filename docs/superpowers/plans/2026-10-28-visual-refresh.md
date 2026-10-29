# NASEEJ Visual Refresh Plan

**Goal:** Restyle the complete Arabic RTL storefront while leaving the clothing rail hero visually and behaviorally unchanged.

**Architecture:** Keep route logic and commerce behavior intact. Establish a compact three-layer design token system in the global stylesheet, then update the shared shell and the store, product, and editorial components to use those tokens. Isolate the existing rail section with its current token values and typography so global changes cannot alter its appearance.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Lucide.

**Reference:** User request in this chat; NASEEJ project brief in `docs/PLAN.md`.

## Global constraints

- Modify files only under `store/`.
- Keep `src/components/ui/product-rail-gallery.tsx` and the rendered `رف الملابس` section unchanged in appearance, interaction, and content.
- Preserve Arabic-first RTL, EGP, COD, catalog data, and order behavior.
- Use responsive mobile-first styles, visible focus, accessible contrast, and reduced-motion support.
- Avoid introducing new dependencies or unverified marketing claims.

## Design direction

- **Palette:** Chalk `#F7F8F5`, paper `#FFFFFF`, forest `#183A32`, leaf `#567261`, mist `#E6ECE7`, ink `#1C2924`, muted ink `#58665F`, seam `#D7E0DA`, brass `#B78542`, and clay `#B6654D` for errors only.
- **Typography:** IBM Plex Sans Arabic for body and controls, Noto Naskh Arabic for editorial headings, IBM Plex Mono for Latin numerals and prices. Keep the rail's current Noto Kufi and IBM Plex styles locally pinned.
- **Layout:** Quiet apparel storefront with spacious image wells, consistent page headings, a centered desktop navigation, a compact mobile menu, product-first cards, and a deep forest footer.
- **Controls:** 44px minimum interaction height, restrained 8px corners, clear primary action, outlined secondary action, aligned focus and disabled states.
- **21st.dev reference:** Product-card composition from its catalog metadata: clear image area and separate title/color/price/action footer. No third-party source code copied.

## Files and steps

1. `src/app/globals.css`, `src/app/layout.tsx`: semantic and component tokens, Arabic display font role, common page rhythm, control states, responsive rules, and rail-scoped legacy token values.
2. `src/components/store/site-header.tsx`, `site-footer.tsx`: coordinated desktop/mobile navigation and footer hierarchy.
3. `src/components/store/product-card.tsx`, `product-grid.tsx`, `shop-browser.tsx`, `src/app/shop/**`: consistent catalog cards, filter controls, grid density, and empty state.
4. `src/app/product/**`, cart, checkout, order, track, size guide, and support/editorial pages: align headings, inputs, tables, panels, and feedback with the system without changing business behavior or copy facts.
5. Inspect the desktop and mobile preview, verify the rail's existing piece deep link and appearance, then run lint, typecheck, and the project’s existing unit/browser checks. Record actual outcomes in `docs/QA.md`.

## Review focus

- Rail variables and inherited font must remain pinned despite global token changes.
- Mobile navigation and controls must fit 320–390px without clipping or horizontal overflow.
- Checkout validation and disabled/loading states must remain understandable and keyboard accessible.
- Product images and names must stay legible without turning the product list into heavy bordered cards.
- Color-only status cues, hover-only controls, and reduced-motion regressions must be avoided.
