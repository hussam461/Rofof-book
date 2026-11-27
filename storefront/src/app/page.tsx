import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Building2, ChevronLeft, Globe2, Landmark, LibraryBig, Map, Sparkles, Star, type LucideIcon } from "lucide-react";
import { BookActions } from "@/components/book-actions";
import { CartAddedToast } from "@/components/cart-added-toast";
import { CategoriesCarousel } from "@/components/categories-carousel";
import { StoreHeader } from "@/components/store-header";
import { demoBooks } from "@/lib/demo-books";
import { literaryBooks } from "@/lib/literary-books";

const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type ShelfBook = {
  id: string;
  title: string;
  price: number;
  cover: string;
  mark?: string;
  coverImage?: string;
};

const demoShelfBooks: ShelfBook[] = demoBooks.map((book) => ({
  id: book.id,
  title: book.title,
  price: book.price,
  cover: book.cover,
  mark: book.mark,
}));

const literaryShelfBooks: ShelfBook[] = literaryBooks.map((book) => ({
  id: book.id,
  title: book.title,
  price: book.price,
  cover: book.cover,
  coverImage: book.coverImage,
}));

const homeSections = [
  {
    id: "books",
    kicker: "وصلت إلى رفوف",
    title: "كتب وصلت",
    accent: "حديثًا",
    description: "إصدارات جديدة تستحق أن تكون أول ما تفتحه اليوم.",
    books: literaryShelfBooks,
    tone: "shelf-section--ivory",
  },
  {
    id: "best-sellers",
    kicker: "اختيار القراء",
    title: "الأكثر",
    accent: "طلبًا",
    description: "كتب عادت إليها أيادي القراء مرة بعد أخرى.",
    books: demoShelfBooks,
    tone: "shelf-section--sage",
  },
  {
    id: "literary-picks",
    kicker: "للذين يحبون الحكايات",
    title: "روايات",
    accent: "أدبية",
    description: "حكايات هادئة وعميقة، من رف الرواية إلى قلبك.",
    books: literaryShelfBooks,
    tone: "shelf-section--cream",
  },
  {
    id: "self-development",
    kicker: "خطوة صغيرة كل يوم",
    title: "تنمية",
    accent: "بشرية",
    description: "أفكار عملية تساعدك على فهم نفسك والعالم من حولك.",
    books: demoShelfBooks,
    tone: "shelf-section--sage",
  },
  {
    id: "thought-and-philosophy",
    kicker: "مساحة للتأمل",
    title: "كتب",
    accent: "فكرية",
    description: "أسئلة مختلفة وكتب تترك أثرًا بعد الصفحة الأخيرة.",
    books: literaryShelfBooks,
    tone: "shelf-section--ivory",
  },
  {
    id: "rofof-selection",
    kicker: "من أمين رفوف",
    title: "اختيارات",
    accent: "خاصة",
    description: "مجموعة صغيرة اختيرت لتبدأ بها حكاية قراءة جديدة.",
    books: demoShelfBooks,
    tone: "shelf-section--cream",
  },
] as const;

const literaryGenres: { name: string; icon: LucideIcon; tone: string }[] = [
  { name: "أدب كوري", icon: LibraryBig, tone: "genre-korea" },
  { name: "أدب بريطاني", icon: Landmark, tone: "genre-britain" },
  { name: "أدب فرنسي", icon: Building2, tone: "genre-france" },
  { name: "أدب روسي", icon: Globe2, tone: "genre-russia" },
  { name: "أدب إسباني", icon: Map, tone: "genre-spain" },
  { name: "أدب أمريكي", icon: Landmark, tone: "genre-america" },
];

function LiteraryGenres() {
  return (
    <section className="literary-genres" id="literary-genres" aria-labelledby="literary-genres-heading">
      <div className="shell">
        <div className="literary-genres-heading">
          <span className="section-kicker">رحلات تبدأ من صفحة</span>
          <h2 id="literary-genres-heading">تصنيفات <em>الأدب</em></h2>
          <p>اختر بلدًا، واترك الحكاية تقودك إلى عالم جديد.</p>
        </div>
        <div className="literary-genres-grid">
          {literaryGenres.map(({ name, icon: Icon, tone }) => (
            <a className="literary-genre" href="#literary-picks" key={name} aria-label={`تصفح ${name}`}>
              <span className={`literary-genre-medallion ${tone}`}><Icon size={47} strokeWidth={1.35} aria-hidden="true" /></span>
              <span className="literary-genre-bottom">
                <span className="literary-genre-name">{name}</span>
                <span className="literary-genre-arrow"><ArrowLeft size={14} aria-hidden="true" /></span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookShelf({
  id,
  kicker,
  title,
  accent,
  description,
  books,
  tone,
}: (typeof homeSections)[number]) {
  return (
    <section className={`featured-section shelf-section ${tone}`} id={id} aria-labelledby={`${id}-heading`}>
      <div className="shell">
        <div className="section-heading shelf-heading">
          <div>
            <span className="section-kicker">{kicker}</span>
            <h2 id={`${id}-heading`}>{title} <em>{accent}</em></h2>
            <p>{description}</p>
          </div>
          <a className="text-link" href={`#${id}-grid`}>عرض الكل <ChevronLeft size={17} /></a>
        </div>
        <div className="books-grid" id={`${id}-grid`}>
          {books.map((book) => (
            <article className="book-card" key={`${id}-${book.id}`}>
              <div className={`book-cover-wrap${book.coverImage ? " literary-cover" : ""}`}>
                {book.coverImage ? (
                  <Image
                    className="literary-cover-image"
                    src={book.coverImage}
                    alt={`غلاف ${book.title}`}
                    fill
                    sizes="(max-width: 600px) 45vw, (max-width: 900px) 22vw, 16vw"
                  />
                ) : (
                  <div className={`book-cover ${book.cover}`} aria-label={`غلاف كتاب ${book.title}`} role="img">
                    <strong>{(book.mark ?? book.title).split("\n").map((line) => <span key={line}>{line}</span>)}</strong>
                  </div>
                )}
                <BookActions bookId={book.id} title={book.title} />
              </div>
              <div className="book-info">
                <div className="book-title-row"><h3>{book.title}</h3></div>
                <span className="book-rating" role="img" aria-label="التقييم ٤٫٨ من ٥">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} strokeWidth={1.8} aria-hidden="true" />)}
                </span>
                <div className="price-row">
                  <strong><small>YER</small> {priceFormatter.format(book.price)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="storefront">
      <div className="announcement"><Sparkles size={14} aria-hidden="true" /><span>تسوّق براحة — الدفع عند الاستلام</span></div>
      <StoreHeader />
      <CartAddedToast />

      <section className="home-banner" aria-labelledby="banner-title">
        <div className="home-banner-art" role="img" aria-label="رسم لكتاب مفتوح وكتب من رفوف">
          <Image src="/images/rofof-home-banner.svg" alt="" fill priority sizes="100vw" />
        </div>
        <div className="home-banner-content shell">
          <span className="banner-kicker"><Sparkles size={15} /> حكايتك القادمة أقرب مما تتخيل</span>
          <h1 id="banner-title">في رفوف، لكل قارئ<br /><em>حكاية تشبهه</em></h1>
          <p>تصفّح كتباً اخترناها بمحبة، وابدأ رحلتك من هنا.</p>
          <a className="banner-button" href="#books">اكتشف الكتب <ArrowLeft size={17} /></a>
        </div>
      </section>

      <CategoriesCarousel />
      <LiteraryGenres />

      {homeSections.map((section) => <BookShelf key={section.id} {...section} />)}

      <footer className="site-footer" id="footer"><div className="shell footer-main"><Link href="/" className="brand"><span className="brand-mark"><BookOpen size={23} /></span><span className="brand-copy"><strong>رفوف</strong><small>ROFOF BOOK</small></span></Link><p>رفّك الأقرب إلى الحكايات التي تحبها.</p><span>© ٢٠٢٦ رفوف بوك</span></div></footer>
    </main>
  );
}
