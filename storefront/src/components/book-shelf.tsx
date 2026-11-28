"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { BookActions } from "@/components/book-actions";

type ShelfBook = {
  id: string;
  title: string;
  price: number;
  cover: string;
  mark?: string;
  coverImage?: string;
};

type BookShelfProps = {
  id: string;
  title: string;
  accent: string;
  description: string;
  books: ShelfBook[];
  tone: string;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export function BookShelf({ id, title, accent, description, books, tone }: BookShelfProps) {
  const desktopBooksPerPage = Math.min(Math.max(books.length, 4), 6);
  const [page, setPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(desktopBooksPerPage);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 600px)");
    const updateBooksPerPage = () => {
      setBooksPerPage(mobileViewport.matches ? 2 : desktopBooksPerPage);
      setPage(0);
    };

    updateBooksPerPage();
    mobileViewport.addEventListener("change", updateBooksPerPage);
    return () => mobileViewport.removeEventListener("change", updateBooksPerPage);
  }, [desktopBooksPerPage]);

  const pageCount = Math.max(1, Math.ceil(books.length / booksPerPage));
  const pages = Array.from({ length: pageCount }, (_, pageIndex) =>
    books.slice(pageIndex * booksPerPage, (pageIndex + 1) * booksPerPage),
  );

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;

    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;

    const swipeDistance = endX - startX;
    if (swipeDistance < -48) {
      setPage((current) => Math.min(current + 1, pageCount - 1));
    } else if (swipeDistance > 48) {
      setPage((current) => Math.max(current - 1, 0));
    }
  }

  return (
    <section className={`featured-section shelf-section ${tone}`} id={id} aria-labelledby={`${id}-heading`}>
      <div className="shell">
        <div className="section-heading shelf-heading">
          <div className="shelf-heading-copy">
            <h2 id={`${id}-heading`}>{title} <em>{accent}</em></h2>
            <p>{description}</p>
          </div>
          <div className="shelf-heading-actions">
            <div className="carousel-controls shelf-carousel-controls" aria-label={`التنقل بين صفحات ${title}`}>
              <button type="button" onClick={() => setPage((current) => Math.min(current + 1, pageCount - 1))} aria-label={`التالي: ${title}`} disabled={page >= pageCount - 1}>
                <ArrowLeft size={17} />
              </button>
              <button type="button" onClick={() => setPage((current) => Math.max(current - 1, 0))} aria-label={`السابق: ${title}`} disabled={page === 0}>
                <ArrowRight size={17} />
              </button>
            </div>
            <a className="text-link" href={`#${id}-grid`}>عرض الكل</a>
          </div>
        </div>
        <div
          className="shelf-carousel-viewport"
          id={`${id}-grid`}
          role="region"
          aria-label={`كتب ${title}`}
          aria-roledescription="رف كتب"
          onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchStartX.current = null; }}
        >
          <div
            className="shelf-carousel-track"
            style={{
              width: `${pageCount * 100}%`,
              transform: `translateX(${page * (100 / pageCount)}%)`,
            }}
          >
            {pages.map((booksOnPage, pageIndex) => (
              <div
                className={`books-grid shelf-carousel-page${books.length > 4 ? " shelf-books-grid--six" : ""}`}
                key={`${id}-page-${pageIndex}`}
                style={{ flexBasis: `${100 / pageCount}%` }}
                aria-hidden={pageIndex !== page}
                inert={pageIndex !== page}
                role="group"
                aria-label={`${pageIndex + 1} من ${pageCount}`}
                aria-roledescription="صفحة كتب"
              >
                {booksOnPage.map((book) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
