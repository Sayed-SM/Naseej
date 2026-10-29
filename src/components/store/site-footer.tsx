import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { site } from "@/lib/site";

const groups = [
  { title: "المتجر", links: [["الدروب", "/"], ["كل القطع", "/shop"], ["دليل المقاسات", "/size-guide"]] },
  { title: "مساعدة", links: [["الشحن والاستبدال", "/shipping-returns"], ["الأسئلة الشائعة", "/faq"], ["تتبّع الطلب", "/track"]] },
  { title: "عن نسيج", links: [["حكايتنا", "/about"], ["من الدفتر", "/journal"], ["الشروط", "/legal/terms"]] },
  { title: "تواصل", links: [["راسلنا", "/contact"], ["الخصوصية", "/legal/privacy"]] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-store">
        <div className="site-footer__top">
          <div className="site-footer__brand-block">
            <Link href="/" className="site-wordmark" aria-label={`${site.brandAr} الصفحة الرئيسية`}>{site.brandAr}</Link>
            <p>{site.tagline}</p>
            <Link href="/shop" className="site-footer__shop-link">اكتشف القطع <ArrowUpLeft size={16} aria-hidden="true" /></Link>
          </div>
          <div className="site-footer__links">
            {groups.map((group) => <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </div>)}
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>الدفع عند الاستلام</span>
          <span>الشحن مجاني للطلبات فوق 2,500 ج.م.</span>
          <span><bdi dir="ltr">© 2026 {site.brandEn}</bdi></span>
        </div>
      </div>
    </footer>
  );
}
