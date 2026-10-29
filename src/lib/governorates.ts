export type ShippingZone = { name: string; governorates: string[]; fee: number; eta: string };
export const shippingZones: ShippingZone[] = [
  { name: "القاهرة والجيزة", governorates: ["القاهرة", "الجيزة"], fee: 60, eta: "1–2 يوم" },
  { name: "الإسكندرية والدلتا", governorates: ["الإسكندرية", "القليوبية", "الدقهلية", "الشرقية", "الغربية", "المنوفية", "البحيرة", "كفر الشيخ", "دمياط", "بورسعيد", "الإسماعيلية", "السويس"], fee: 75, eta: "2–3 أيام" },
  { name: "الصعيد", governorates: ["بني سويف", "الفيوم", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان"], fee: 95, eta: "3–4 أيام" },
  { name: "مناطق بعيدة", governorates: ["البحر الأحمر", "جنوب سيناء", "شمال سيناء", "مطروح", "الوادي الجديد"], fee: 120, eta: "4–6 أيام" },
  { name: "استلام من الاستوديو", governorates: ["المهندسين"], fee: 0, eta: "في نفس اليوم، بموعد" },
];
export const governorates = shippingZones.flatMap((zone) => zone.governorates);
