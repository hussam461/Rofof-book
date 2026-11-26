export const demoBooks = [
  { id: "midnight-library", title: "مكتبة منتصف الليل", author: "مات هيغ", price: 4500, priceLabel: "٤٬٥٠٠", oldPriceLabel: "٥٬٥٠٠", tag: "الأكثر طلباً", cover: "cover-night", mark: "بين حياةٍ\nوحياة" },
  { id: "subtle-art", title: "فن اللامبالاة", author: "مارك مانسون", price: 3500, priceLabel: "٣٬٥٠٠", oldPriceLabel: "٤٬٠٠٠", tag: "خصم مميز", cover: "cover-art", mark: "فن\nاللامبالاة" },
  { id: "loved-you", title: "أحببتك أكثر مما ينبغي", author: "أثير عبدالله النشمي", price: 4000, priceLabel: "٤٬٠٠٠", oldPriceLabel: "", tag: "اختيار القراء", cover: "cover-love", mark: "أحببتك\nأكثر" },
  { id: "atomic-habits", title: "العادات الذرية", author: "جيمس كلير", price: 5000, priceLabel: "٥٬٠٠٠", oldPriceLabel: "٦٬٠٠٠", tag: "الأكثر مبيعاً", cover: "cover-habits", mark: "العادات\nالذرية" },
];

export type DemoBook = (typeof demoBooks)[number];
