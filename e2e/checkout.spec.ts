import { expect, test } from "@playwright/test";

test("visitor adds a size and completes COD checkout", async ({ page }) => {
  await page.goto("/product/bone-tee");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "أضف للسلة" }).click();
  await page.goto("/checkout");
  await page.getByLabel("الاسم بالكامل").fill("سارة محمد");
  await page.getByLabel("رقم الموبايل").first().fill("01012345678");
  await page.getByLabel("المدينة / المنطقة").fill("الدقي");
  await page.getByLabel("العنوان بالتفصيل").fill("شارع التحرير، عمارة ١٢، الدور الثالث");
  await page.getByRole("button", { name: "تأكيد الطلب" }).click();
  await expect(page).toHaveURL(/\/order\/NSJ-/);
  await expect(page.getByRole("heading", { name: "تم استلام طلبك" })).toBeVisible();
  await expect(page.getByRole("link", { name: "أكد طلبك على واتساب" })).toHaveAttribute("href", /wa\.me/);
});

test("rail supports arrow keys, Enter, Escape, and focus return", async ({ page }) => {
  await page.goto("/");
  const rail = page.getByRole("group", { name: "اسحب لتصفح القطع" });
  await rail.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page).toHaveURL(/\?piece=/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).not.toHaveURL(/piece=/);
  await expect(rail).toBeFocused();
});

test("out of stock sizes and an unselected size cannot be added", async ({ page }) => {
  await page.goto("/product/bone-tee");
  await expect(page.getByRole("button", { name: "XXL" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "اختار المقاس" })).toBeDisabled();
});
