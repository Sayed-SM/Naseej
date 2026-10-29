"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menu = openPath === pathname;
  useEffect(() => {
    if (!menu) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpenPath(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menu]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="site-header__inner container-store">
        <div className="site-header__brand">
          <button className="site-icon-button site-header__menu" aria-label={menu ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setOpenPath(menu ? null : pathname)}>
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="site-wordmark" aria-label={`${site.brandAr} الصفحة الرئيسية`}>{site.brandAr}</Link>
        </div>
        <nav className="site-header__nav" aria-label="التنقل الرئيسي">
          {site.nav.map((item) => (
            <Link className={`site-nav-link${active(item.href) ? " is-active" : ""}`} aria-current={active(item.href) ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link href="/shop" className="site-icon-button" aria-label="ابحث في المتجر"><Search size={19} strokeWidth={1.8} /></Link>
          <Link href="/cart" className="site-cart-link" aria-label={`السلة، ${count} قطع`}>
            <span className="site-icon-button"><ShoppingBag size={19} strokeWidth={1.8} /></span>
            <span className="site-cart-count" dir="ltr">{count}</span>
          </Link>
        </div>
      </div>
      {menu && <>
        <button className="site-menu-scrim" aria-label="إغلاق القائمة" onClick={() => setOpenPath(null)} />
        <nav id="mobile-navigation" className="site-mobile-menu" aria-label="القائمة">
          <p className="meta site-mobile-menu__label">تصفّح نسيج</p>
          <ul>{[...site.nav, { label: "الأسئلة الشائعة", href: "/faq" }, { label: "تواصل معنا", href: "/contact" }].map((item) => (
            <li key={item.href}><Link href={item.href} aria-current={active(item.href) ? "page" : undefined} onClick={() => setOpenPath(null)}>{item.label}<span aria-hidden="true">↗</span></Link></li>
          ))}</ul>
          <p className="site-mobile-menu__note">قطع يومية، بتفاصيل واضحة.</p>
        </nav>
      </>}
    </header>
  );
}
