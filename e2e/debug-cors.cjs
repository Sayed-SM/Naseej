const { chromium } = require("@playwright/test");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const routes = ["/", "/shop", "/shop/tees", "/shop/shirts", "/shop/knitwear", "/shop/hoodies", "/shop/unknown", "/product/bone-tee", "/product/nope", "/cart", "/checkout", "/order/NSJ-261027-2222", "/track", "/size-guide", "/shipping-returns", "/about", "/journal", "/journal/240gsm-cotton", "/journal/knit-care", "/faq", "/contact", "/legal/terms", "/legal/privacy", "/this-route-does-not-exist"];
  const viewports = [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 390, height: 844 }];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      const warnings = [];
      page.on("console", (m) => { if (m.type() === "warning" && m.text().includes("LCP")) warnings.push(m.text().slice(0, 80)); });
      await page.goto("http://127.0.0.1:3001" + route, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(400);
      if (warnings.length) console.log("viewport:", viewport.width, "route:", route, "->", JSON.stringify(warnings));
      page.removeAllListeners("console");
    }
  }
  await browser.close();
})();