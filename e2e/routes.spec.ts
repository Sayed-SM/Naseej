import { mkdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

const routes = ["/", "/shop", "/shop/tees", "/shop/shirts", "/shop/knitwear", "/shop/hoodies", "/shop/unknown", "/product/bone-tee", "/product/nope", "/cart", "/checkout", "/order/NSJ-261027-2222", "/track", "/size-guide", "/shipping-returns", "/about", "/journal", "/journal/240gsm-cotton", "/journal/knit-care", "/faq", "/contact", "/legal/terms", "/legal/privacy", "/this-route-does-not-exist"];
const expectedNotFound = new Set(["/shop/unknown", "/product/nope", "/this-route-does-not-exist"]);
const viewports = [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 390, height: 844 }];

test("all public routes render in RTL at the target viewports", async ({ page, browser }, testInfo) => {
  test.setTimeout(180_000);
  mkdirSync("docs/qa", { recursive: true });
  const failed: string[] = [];
  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  page.on("requestfailed", (request) => { const reason = request.failure()?.errorText ?? "failed"; if (reason !== "net::ERR_ABORTED") failed.push(`${request.method()} ${request.url()} — ${reason}`); });
  page.on("console", (message) => { if (message.type() === "error" && !(Array.from(expectedNotFound).some((route) => page.url().includes(route)) && message.text().includes("status of 404"))) consoleErrors.push(message.text()); });
  page.on("console", (message) => { if (message.type() === "warning") consoleWarnings.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("response", (response) => { if (response.request().resourceType() !== "document" && response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  for (const route of routes) {
    for (const viewport of viewports) {
      const warningsThisIter: string[] = [];
      page.on("console", (message) => { if (message.type() === "warning") warningsThisIter.push(message.text()); });
      await page.setViewportSize(viewport);
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${route} at ${viewport.width}px`).toBe(expectedNotFound.has(route) ? 404 : 200);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await page.waitForTimeout(350);
      if (warningsThisIter.some((w) => w.includes("LCP"))) console.log("LCP warning at", { route, viewport: viewport.width, warnings: warningsThisIter.filter((w) => w.includes("LCP")) });
      consoleWarnings.push(...warningsThisIter);
      page.removeAllListeners("console");
      await page.screenshot({ path: `docs/qa/${route.replaceAll("/", "-").replace(/^-/, "home")}-${viewport.width}.png`, fullPage: true, animations: "disabled", caret: "initial" });
    }
  }
  await testInfo.attach("failed-requests.json", { body: JSON.stringify(failed, null, 2), contentType: "application/json" });
  await testInfo.attach("console-errors.json", { body: JSON.stringify(consoleErrors, null, 2), contentType: "application/json" });
  await testInfo.attach("console-warnings.json", { body: JSON.stringify(consoleWarnings, null, 2), contentType: "application/json" });
  const cleanContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const cleanPage = await cleanContext.newPage();
  await cleanPage.goto("/", { waitUntil: "domcontentloaded" });
  await cleanPage.waitForTimeout(700);
  const metrics = await cleanPage.evaluate(() => ({
    transferredJavaScript: performance.getEntriesByType("resource").filter((entry) => { try { return new URL(entry.name).origin === location.origin && new URL(entry.name).pathname.endsWith(".js"); } catch { return false; } }).reduce((total, entry) => total + (entry as PerformanceResourceTiming).transferSize, 0),
    cls: performance.getEntriesByType("layout-shift").reduce((total, entry) => total + ((entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean }).hadRecentInput ? 0 : (entry as PerformanceEntry & { value?: number }).value ?? 0), 0),
    viewportWidth: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
  }));
  console.log("QA home metrics:", JSON.stringify(metrics));
  await testInfo.attach("home-metrics.json", { body: JSON.stringify(metrics, null, 2), contentType: "application/json" });
  expect(consoleErrors, "browser console and runtime errors").toEqual([]);
  expect(consoleWarnings, "browser console warnings").toEqual([]);
  expect(failed, "failed images and network requests").toEqual([]);
  await cleanPage.setViewportSize({ width: 320, height: 800 });
  await expect.poll(() => cleanPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  await cleanContext.close();
});
