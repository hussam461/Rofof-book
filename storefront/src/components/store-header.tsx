"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { ArrowLeft, BookOpen, Heart, Menu, Minus, Plus, Search, ShoppingCart, Trash2, X } from "lucide-react";
import { demoBooks } from "@/lib/demo-books";
import { useStore } from "@/components/store-provider";

type Panel = "cart" | "favorites" | null;

function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("ar-YE").format(amount)} ر.ي`;
}

export function StoreHeader() {
  const { cart, favorites, addToCart, toggleFavorite, updateQuantity } = useStore();
  const [panel, setPanel] = useState<Panel>(null);
  const [panelPosition, setPanelPosition] = useState({ top: 0, right: 16, maxHeight: 540 });
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const favoritesButtonRef = useRef<HTMLButtonElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const book = demoBooks.find((candidate) => candidate.id === item.bookId);
    return sum + (book?.price ?? 0) * item.quantity;
  }, 0);
  const panelBooks = panel === "cart"
    ? cart.flatMap((item) => {
      const book = demoBooks.find((candidate) => candidate.id === item.bookId);
      return book ? [{ book, quantity: item.quantity }] : [];
    })
    : favorites.flatMap((bookId) => {
      const book = demoBooks.find((candidate) => candidate.id === bookId);
      return book ? [{ book, quantity: 1 }] : [];
    });

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const clickedPanel = panelRef.current?.contains(target) ?? false;
      const clickedTrigger = favoritesButtonRef.current?.contains(target) || cartButtonRef.current?.contains(target);
      if (panel && !clickedPanel && !clickedTrigger) setPanel(null);

      const clickedMenu = menuButtonRef.current?.contains(target) || navigationRef.current?.contains(target);
      if (menuOpen && !clickedMenu) setMenuOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPanel(null);
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, panel]);

  function togglePanel(nextPanel: Exclude<Panel, null>, event: MouseEvent<HTMLButtonElement>) {
    if (panel === nextPanel) {
      setPanel(null);
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const panelWidth = Math.min(370, window.innerWidth - 32);
    const maxRight = Math.max(16, window.innerWidth - panelWidth - 16);
    const preferredRight = window.innerWidth - bounds.right;
    const top = Math.min(bounds.bottom + 10, Math.max(16, window.innerHeight - 180));
    setPanelPosition({
      top,
      right: Math.min(Math.max(preferredRight, 16), maxRight),
      maxHeight: Math.max(160, window.innerHeight - top - 16),
    });
    setPanel(nextPanel);
  }

  return (
    <header className="site-header">
      <div className="header-main shell">
        <button className="mobile-nav-toggle" ref={menuButtonRef} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen} aria-controls="main-navigation">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <Link href="/" className="brand" aria-label="رفوف بوك - الصفحة الرئيسية">
          <span className="brand-mark"><BookOpen size={25} strokeWidth={1.8} /></span>
          <span className="brand-copy"><strong>رفوف</strong><small>ROFOF BOOK</small></span>
        </Link>

        <nav className={`main-navigation${menuOpen ? " is-open" : ""}`} ref={navigationRef} id="main-navigation" aria-label="التنقل الرئيسي">
          <Link className="nav-active" href="/">الرئيسية</Link>
          <Link href="#categories" onClick={() => setMenuOpen(false)}>أقسام الكتب</Link>
          <Link href="#books" onClick={() => setMenuOpen(false)}>الأكثر مبيعاً</Link>
          <Link href="#books" onClick={() => setMenuOpen(false)}>عروض وخصومات</Link>
          <Link href="#footer" onClick={() => setMenuOpen(false)}>من نحن</Link>
        </nav>

        <form className="search-box" action="/" role="search">
          <label className="sr-only" htmlFor="book-search">ابحث عن كتاب أو مؤلف</label>
          <input className="store-search-input" id="book-search" name="q" type="search" autoComplete="off" placeholder="ابحث عن كتاب، مؤلف أو تصنيف..." />
          <button type="submit" aria-label="ابحث"><Search size={18} /></button>
        </form>

        <div className="header-actions">
          <button className={`favorite-trigger${panel === "favorites" ? " is-active" : ""}`} ref={favoritesButtonRef} type="button" onClick={(event) => togglePanel("favorites", event)} aria-label={`المفضلة، ${favorites.length} كتب`} aria-expanded={panel === "favorites"} aria-controls="store-popover">
            <Heart size={22} fill={favorites.length ? "currentColor" : "none"} />
            {favorites.length > 0 && <span className="header-count">{favorites.length}</span>}
          </button>
          <button id="store-cart-trigger" className={`cart-button${panel === "cart" ? " is-active" : ""}`} ref={cartButtonRef} type="button" onClick={(event) => togglePanel("cart", event)} aria-label={`السلة، ${formatPrice(cartTotal)}`} aria-expanded={panel === "cart"} aria-controls="store-popover">
            <span className="cart-icon"><ShoppingCart size={21} />{cartCount > 0 && <i>{cartCount}</i>}</span>
            <span className="cart-total">{formatPrice(cartTotal)}</span>
          </button>

          {panel && (
            <aside className="store-popover" id="store-popover" ref={panelRef} style={{ top: panelPosition.top, right: panelPosition.right, maxHeight: panelPosition.maxHeight }} aria-label={panel === "cart" ? "سلة التسوق" : "قائمة الرغبات"}>
            <div className="store-popover-heading">
              <div><span>{panel === "cart" ? "سلة التسوق" : "قائمة الرغبات"}</span><small>{panelBooks.length ? `${panelBooks.length} كتب` : "رفوفك تنتظر كتاباً"}</small></div>
              <button className="popover-close" type="button" onClick={() => setPanel(null)} aria-label="إغلاق"><X size={19} /></button>
            </div>
            {panelBooks.length === 0 ? (
              <p className="store-empty">{panel === "cart" ? "لم تضف كتباً إلى سلتك بعد." : "احفظ الكتب التي أعجبتك لتجدها هنا."}</p>
            ) : (
              <ul className="store-lines">
                {panelBooks.map(({ book, quantity }) => (
                  <li key={book.id}>
                    <div className={`mini-cover ${book.cover}`} aria-hidden="true"><BookOpen size={19} /></div>
                    <div className="store-line-info"><strong>{book.title}</strong><small>{panel === "cart" ? `${formatPrice(book.price)} · الكمية ${quantity}` : formatPrice(book.price)}</small></div>
                    {panel === "cart" ? (
                      <div className="quantity-actions">
                        <button type="button" onClick={() => updateQuantity(book.id, quantity - 1)} aria-label={`تقليل كمية ${book.title}`}><Minus size={13} /></button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => addToCart(book.id)} aria-label={`زيادة كمية ${book.title}`}><Plus size={13} /></button>
                      </div>
                    ) : (
                      <button className="remove-favorite" type="button" onClick={() => toggleFavorite(book.id)} aria-label={`إزالة ${book.title} من الرغبات`}><Trash2 size={16} /></button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {panel === "cart" && cart.length > 0 && <div className="store-popover-total"><span>الإجمالي</span><strong>{formatPrice(cartTotal)}</strong></div>}
            {panel === "favorites" && favorites.length > 0 && <button className="move-favorites" type="button" onClick={() => { favorites.forEach(addToCart); setPanel("cart"); }}>أضف المفضلة إلى السلة <ArrowLeft size={15} /></button>}
            </aside>
          )}
        </div>
      </div>
    </header>
  );
}
