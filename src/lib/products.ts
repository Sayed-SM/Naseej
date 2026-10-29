export type Size = "S" | "M" | "L" | "XL" | "XXL";
export type Category = "tees" | "shirts" | "knitwear" | "hoodies";
export type Product = {
  id: string; slug: string; nameAr: string; nameEn: string; colorAr: string; colorHex: string;
  price: number; compareAt?: number; category: Category; kind: "tee" | "shirt" | "knit" | "hoodie";
  sizes: Size[]; stock: Record<Size, number>; fabricAr: string; fitAr: string; careAr: string;
  shortAr: string; longAr: string; images: { front: string; back: string; side: string }; badges?: ("new" | "last" | "drop")[];
};

const cdn = "https://cdn.21st.dev/assets/mirror/";
const stockByCategory: Record<Category, Record<Size, number>> = {
  tees: { S: 8, M: 12, L: 10, XL: 6, XXL: 0 },
  shirts: { S: 4, M: 7, L: 5, XL: 2, XXL: 0 },
  knitwear: { S: 3, M: 6, L: 4, XL: 1, XXL: 0 },
  hoodies: { S: 5, M: 9, L: 7, XL: 3, XXL: 0 },
};
const sizesByCategory: Record<Category, Size[]> = {
  tees: ["S", "M", "L", "XL", "XXL"], shirts: ["S", "M", "L", "XL", "XXL"],
  knitwear: ["S", "M", "L", "XL"], hoodies: ["S", "M", "L", "XL"],
};
const imageRows = [
  ["14/1485bf44725b18fcdba71bfae54d67d648ab3bff4b24215a042c0cc4c895a2e6.webp", "69/69937e656430ae33d950303e0d53051273e5b02189750ef1e7429ec4bbf95e20.webp", "83/838468c32f16b4acba62e4601276737411156052444712ff2534fefe994a7bed.webp"],
  ["d7/d769f183472d0fd98a7aff2a643593748cd36ef9da1497d9bf6f0d87d1025a9b.webp", "fe/fec6f7e96b198cc5b9aad333ca2c4c10968a746d87f6dc11d9c118607b509058.webp", "b3/b3b6984ea94b8b8cd19fb15387e89dca457ac0f947115c2a54a33217e4fb4571.webp"],
  ["47/470a7723cef068f81e8a4c09d1ab3f8630c61b734c2168b10f3858e45efbf31f.webp", "9b/9be14e5dce879756775677e2d82dadc2ad9a1690b7df2f82de360cb3600d0ee5.webp", "59/5984d5ca60fd1aeee7e688ec33c2219a1c537fcde90d2accab813c13985f8632.webp"],
  ["58/581b13c5ca241c653dc94d2c8048c92a60f022cfbaaf153261076d3a6655827e.webp", "d9/d9178d906d37268565cf10af3431aee543aacfc73610f7fa7b0fa4758c498cb3.webp", "de/dee1c529600e0460413f1a9b07a29bedb7ea7dc96181fce5d9d6501231e6e45d.webp"],
  ["51/51750ba098dd622df46695bca781b3f0ec336a36b93b070e638cc04455def6d6.webp", "e7/e75c4ac8fb7f14caae756338a31f81f1437bb312b78e0d7d906e9f956e7968fa.webp", "a2/a2eb2463d52146c341ede6bb9f6067e917a23eb29b7b1d1d4c40ac084a01c7ce.webp"],
  ["8e/8e38660e2add9637c27846d9b8d620f2abb228a5a153ccfd7b1c808b6845e1f8.webp", "b9/b9214a6e009ce4b3044595a51ea010c299135bab5b26775c43d7175c86e77898.webp", "59/591872e42b483c43c1cd08a3ac4d7d40c0b5fa2bc585a36096faded2e696e84e.webp"],
  ["19/19fe43cb681195ae227e3164088d86a07a1b6e33cc54c6e35637374736a16894.webp", "e0/e095182b1a7f04e600c5662aa871b4c055c294b152586817d84e312c22f744cf.webp", "00/005a8e10be234bc40917f3153208b8196ba1610c53c987e39942da1f4a7cd808.webp"],
  ["84/84aa4b0e21ed11fcbc083647a607b94ee3a6c21cb66c114cfb1dad0792c15499.webp", "01/01c299df56a29afca8dad4a64858bd506667338bfbd0435118e6c3698c7881b3.webp", "9c/9ca38eeb156aae7d199d3c1ffb7947e395f77d1f094eea006c1b5fbb22352b4e.webp"],
  ["09/096002a95aba7de9c197de4cb5c78cbbe17c1677b19c547cc20c6dbef47a899c.webp", "74/74408a7dbb4f4fc6761ebb8d6ed93187248cddf75e1c2e70d38d04dfdd328776.webp", "ed/eda3afca537071a80d7d82b3f0d1055b56f1f3263c20772224bae6660bf4072c.webp"],
  ["72/7208c811f54e123dd7b1a5c1c3926f43ca832f6c4c20c45de10671ffd544409d.webp", "d3/d356989b7bc741c5cfc934cac34983dfb24d5d6a6b6e7b8b7f6b27cd3eceae69.webp", "bf/bf94beeafb21f9cb21aa45057a67dc8a2e23ba95c7ac0f79dd27ba3ce4a1230c.webp"],
];
const catalog: Array<Omit<Product, "id" | "images" | "sizes" | "stock" | "shortAr" | "longAr"> & { slug: string }> = [
  { slug: "bone-tee", nameAr: "تيشيرت ثقيل", nameEn: "Heavy cotton tee", colorAr: "بيج عَظْمي", colorHex: "#EFEBE2", price: 1450, category: "tees", kind: "tee", fabricAr: "قطن 240 gsm", fitAr: "قصة مستقيمة وكتف مرتاح", careAr: "غسيل بارد مع ألوان مشابهة، ويُجفف بعيدًا عن الشمس", badges: ["new", "drop"] },
  { slug: "cc-graphic", nameAr: "تيشيرت جرافيك", nameEn: "Graphic tee", colorAr: "أسود", colorHex: "#101214", price: 1590, category: "tees", kind: "tee", fabricAr: "قطن 220 gsm", fitAr: "قصة مستقيمة", careAr: "يُغسل مقلوبًا على البارد" },
  { slug: "oxford-sky", nameAr: "قميص أوكسفورد", nameEn: "Oxford shirt", colorAr: "سماوي", colorHex: "#A3D3EB", price: 2250, category: "shirts", kind: "shirt", fabricAr: "أوكسفورد قطني 180 gsm", fitAr: "قصة يومية بأكتاف محددة", careAr: "غسيل لطيف وكي متوسط الحرارة" },
  { slug: "cardigan-olive", nameAr: "كارديجان تريكو", nameEn: "Olive cardigan", colorAr: "زيتي", colorHex: "#758151", price: 2900, category: "knitwear", kind: "knit", fabricAr: "قطن تريكو 320 gsm", fitAr: "قصة مريحة بطول متوسط", careAr: "يُغسل يدويًا ويُجفف مسطحًا" },
  { slug: "hoodie-heather", nameAr: "هودي", nameEn: "Heather hoodie", colorAr: "رمادي مِلح", colorHex: "#A0A5AB", price: 2650, category: "hoodies", kind: "hoodie", fabricAr: "قطن مخلوط 300 gsm", fitAr: "قصة واسعة قليلًا", careAr: "غسيل بارد وتجفيف منخفض" },
  { slug: "sweat-lilac", nameAr: "سويت شيرت", nameEn: "Lilac sweatshirt", colorAr: "ليلَكي", colorHex: "#CCB2E0", price: 2350, category: "knitwear", kind: "knit", fabricAr: "قطن 280 gsm", fitAr: "قصة مستقيمة", careAr: "يُغسل مقلوبًا ويُجفف مسطحًا" },
  { slug: "polo-forest", nameAr: "بولو بيكيه", nameEn: "Piqué polo", colorAr: "أخضر غامق", colorHex: "#185B37", price: 1890, category: "tees", kind: "tee", fabricAr: "بيكيه قطني 210 gsm", fitAr: "قصة مستقيمة بياقة ثابتة", careAr: "غسيل بارد وكي خفيف" },
  { slug: "henley-brick", nameAr: "هينلي", nameEn: "Brick henley", colorAr: "طوبي", colorHex: "#B05139", price: 1690, category: "knitwear", kind: "knit", fabricAr: "قطن 230 gsm", fitAr: "قصة قريبة من الجسم", careAr: "يُغسل مع ألوان مشابهة" },
  { slug: "breton", nameAr: "بريتون أكمام طويلة", nameEn: "Breton long sleeve", colorAr: "عاجي", colorHex: "#E4DFD3", price: 1750, category: "knitwear", kind: "knit", fabricAr: "قطن مخطط 220 gsm", fitAr: "قصة مستقيمة بأكمام طويلة", careAr: "غسيل بارد، لا تستخدم المبيض" },
  { slug: "oversized-ochre", nameAr: "تيشيرت أوفرسايز", nameEn: "Oversized tee", colorAr: "مغرة", colorHex: "#DE9C31", price: 1590, category: "tees", kind: "tee", fabricAr: "قطن 240 gsm", fitAr: "قصة واسعة وكتف منخفض", careAr: "يُغسل مقلوبًا على البارد" },
];
const copyByIndex: Array<[string, string]> = [
  ["قماش تقيل بملمس ناعم، وقصة مستقيمة للبس اليومي. الكتف مسحوب قليلًا لراحة الحركة.", "قطن ممشط بوزن 240 gsm، ملمسه متماسك من غير ما يبقى قاسي. القصة مستقيمة، والكتف نازل قليلًا عن مكانه الطبيعي. بياخد شكل الجسم بعد كذا غسلة من غير ما يلتصق. اللون العظمي عملي مع البنطلون الداكن والفاتح، لكن القماش الفاتح قد يحتاج طبقة داخلية مع الضوء القوي. الياقة مضلعة لتفضل ثابتة مع الاستخدام."],
  ["طباعة هادئة على قطن متوسط الوزن وقصة يومية سهلة الحركة.", "قطن بوزن 220 gsm يوازن بين التماسك والخفة. الطباعة الأمامية مطفية حتى لا تلمع تحت الشمس، والقصة مستقيمة من الصدر إلى الحافة. الكم بطول عادي والرقبة مضلعة. الأسود مناسب للاستخدام المتكرر لكنه يظهر عليه الوبر الفاتح إذا غُسل مع منسوجات خشنة. اقلب القطعة قبل الغسيل واتركها تجف في الظل للمحافظة على لونها."],
  ["أوكسفورد قطني ناعم بقصة يومية، مناسب للمكتب والمشاوير.", "نسيج أوكسفورد قطني بوزن 180 gsm، خفيف ومناسب للجو الدافئ. القصة يومية مع كتف محدد ومساحة كافية للحركة. يمكن ارتداؤه مقفولًا أو مفتوحًا فوق تيشيرت. اللون السماوي هادئ، لكنه يحتاج غسيلًا منفصلًا في أول مرة. القماش يتجعد قليلًا بعد الغسيل، لذلك يفيد تعليقه فور خروجه من الغسالة وكيه على حرارة متوسطة."],
  ["تريكو قطني متوسط الثقل، طبقة إضافية بأزرار وقصة مريحة.", "تريكو قطني بوزن 320 gsm يمنح دفئًا واضحًا من غير بطانة. القصة مريحة مع مساحة مناسبة فوق القميص، والأزرار الأمامية تسهّل ضبط الطبقات. الأكمام طويلة بحافة مضلعة. التريكو قد يتمدد إذا عُلّق وهو مبلل، لذلك يُغسل يدويًا ويُجفف مسطحًا. درجة الزيتي تتغير قليلًا بين الإضاءة الداخلية والشمس، وهي أقرب للأرضية من الأخضر الصريح."],
  ["هودي قطني مخلوط بوزن واضح، بجيب أمامي وغطاء رأس مبطن.", "قماش قطني مخلوط بوزن 300 gsm، مناسب للأيام المعتدلة والطبقات. القصة واسعة قليلًا من غير طول زائد، والغطاء مبطن بطبقة واحدة لتقليل الثقل. الجيب الأمامي واسع للاستعمال اليومي. النسيج الداخلي قد يترك وبرًا خفيفًا في الغسلات الأولى؛ اغسله منفصلًا ومقلوبًا. الرمادي المِلح يوزع اللون بين خيوط فاتحة وداكنة، لذلك لا يبدو مسطحًا."],
  ["سويت شيرت قطني ناعم، بقصة مستقيمة ولون ليلكي مطفي.", "قطن بوزن 280 gsm ووجه داخلي ناعم، مناسب كطبقة منفردة أو فوق قميص خفيف. القصة مستقيمة مع حواف مضلعة عند الرقبة والكم والخصر. اللون الليلكي مطفي ويظهر أهدأ في الضوء الطبيعي. لا توجد طبقة داخلية سميكة، لذلك لا يُعامل كقطعة شتوية ثقيلة. يُغسل مقلوبًا ويُجفف مسطحًا حتى لا تتمدد الحافة السفلية."],
  ["بيكيه قطني بملمس شبكي خفيف وياقة تحافظ على شكلها.", "نسيج بيكيه قطني بوزن 210 gsm يسمح بمرور الهواء أكثر من الجيرسيه العادي. القصة مستقيمة، والياقة مضلعة مع فتحة أزرار قصيرة. الأكمام تنتهي بحافة ثابتة لا تضغط على الذراع. الأخضر الداكن غني لكنه قد يبهت مع الماء الساخن. اغسله مع ألوان مشابهة ولا تتركه في الشمس المباشرة لفترة طويلة."],
  ["قماش قطني متوسط الوزن بفتحة أزرار قصيرة وقصة قريبة للجسم.", "قطن بوزن 230 gsm وملمس ناعم متوسط السماكة. فتحة الأزرار القصيرة تعطي مساحة عند الرقبة، والقصة أقرب للجسم من التيشيرت المستقيم من غير أن تكون ضيقة. الأكمام طويلة بحافة بسيطة. اللون الطوبي دافئ وقد يختلف قليلًا عن الشاشة. القماش يحتفظ بشكله مع الغسيل البارد، لكن التجفيف الساخن قد يقصره."],
  ["قطن مخطط بأكمام طويلة، خفيف للطبقات في الجو المعتدل.", "قطن مخطط بوزن 220 gsm، نسيجه متوسط ويمكن ارتداؤه وحده أو تحت جاكيت. القصة مستقيمة والأكمام طويلة بحافة نظيفة. المسافة بين الخطوط ثابتة على الجسم، لكن ترتيبها قد يختلف قليلًا عند الدرزات. اللون العاجي أساسي، وقد تظهر تحته الطبقات الداكنة في ضوء قوي. يُغسل باردًا مع ألوان مشابهة ويُجفف بعيدًا عن الشمس."],
  ["قطن متماسك بقصة واسعة وكتف منخفض، من غير طول مبالغ فيه.", "قطن ممشط بوزن 240 gsm يحافظ على شكل القصة الواسعة. الكتف منخفض، ومساحة الصدر أوسع من التيشيرت المستقيم، بينما الطول قريب من القياس المعتاد حتى لا يتجمع القماش عند الخصر. اللون المغرة يميل للدفء وقد يبدو أغمق داخل المنزل. الياقة مضلعة والقماش لا يحتاج كيًا متكررًا. يُغسل مقلوبًا حتى يحتفظ اللون بمظهره."],
];
export const products: Product[] = catalog.map((item, index) => {
  const sizes = sizesByCategory[item.category];
  const [shortAr, longAr] = copyByIndex[index];
  return {
    ...item, id: item.slug, sizes, stock: { ...stockByCategory[item.category] }, shortAr, longAr,
    images: { front: cdn + imageRows[index][0], back: cdn + imageRows[index][1], side: cdn + imageRows[index][2] },
  };
});

export function getProduct(slug: string): Product | undefined { return products.find((product) => product.slug === slug); }
