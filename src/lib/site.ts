export const site = {
  brandAr: "نَسيج", brandEn: "NASEEJ", tagline: "ملابس تُلبَس كل يوم.", drop: "DROP 01 — الأساسيات",
  whatsapp: "+201000000000", whatsappDisplay: "+20 100 000 0000", email: "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  hours: "الأحد إلى الخميس، 10 ص – 6 م", legalName: "نَسيج للملابس الجاهزة",
  freeShippingThreshold: 2500, returnDays: 14, currency: "EGP",
  nav: [{ label: "الدروب", href: "/" }, { label: "المتجر", href: "/shop" }, { label: "المقاسات", href: "/size-guide" }, { label: "عننا", href: "/about" }],
} as const;
