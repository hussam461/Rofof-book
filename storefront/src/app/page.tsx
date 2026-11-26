import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, ChevronLeft, Sparkles } from "lucide-react";
import { BookActions } from "@/components/book-actions";
import { CategoriesCarousel } from "@/components/categories-carousel";
import { StoreHeader } from "@/components/store-header";
import { demoBooks } from "@/lib/demo-books";

export default function Home() {
  return (
    <main className="storefront">
      <div className="announcement"><Sparkles size={14} aria-hidden="true" /><span>تسوّق براحة — الدفع عند الاستلام</span></div>
      <StoreHeader />

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

      <section className="featured-section" id="books">
        <div className="shell">
          <div className="section-heading"><div><span className="section-kicker">اختيرت بمحبة</span><h2>كتب نرشحها <em>لك</em></h2></div><a className="text-link" href="#books">عرض كل الكتب <ChevronLeft size={17} /></a></div>
          <div className="books-grid">{demoBooks.map((book) => <article className="book-card" key={book.id}>
            <div className="book-cover-wrap"><span className="book-tag">{book.tag}</span><div className={`book-cover ${book.cover}`}><span className="cover-top">ROFOF BOOK · قراءة تستحق</span><strong>{book.mark.split("\n").map((line) => <span key={line}>{line}</span>)}</strong><span className="cover-bottom"><i /> طبعة مختارة</span></div><BookActions bookId={book.id} title={book.title} /></div>
            <div className="book-info"><div className="book-title-row"><h3>{book.title}</h3><span className="book-rating">★ ٤٫٨</span></div><p>{book.author}</p><div className="price-row"><strong>{book.priceLabel} <small>ر.ي</small></strong>{book.oldPriceLabel && <del>{book.oldPriceLabel} ر.ي</del>}</div></div>
          </article>)}</div>
        </div>
      </section>

      <footer className="site-footer" id="footer"><div className="shell footer-main"><Link href="/" className="brand"><span className="brand-mark"><BookOpen size={23} /></span><span className="brand-copy"><strong>رفوف</strong><small>ROFOF BOOK</small></span></Link><p>رفّك الأقرب إلى الحكايات التي تحبها.</p><span>© ٢٠٢٦ رفوف بوك</span></div></footer>
    </main>
  );
}
