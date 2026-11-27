"use client";

import { useEffect } from "react";
import { BookOpen, Check, X } from "lucide-react";
import { allBooks } from "@/lib/books";
import { useStore } from "@/components/store-provider";

const noticeDuration = 6500;

function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("ar-YE").format(amount)} ر.ي`;
}

export function CartAddedToast() {
  const { cartNotice, dismissCartNotice } = useStore();
  const book = cartNotice ? allBooks.find((item) => item.id === cartNotice.bookId) : undefined;
  const noticeId = cartNotice?.id;

  useEffect(() => {
    if (noticeId === undefined) return;
    const timeout = window.setTimeout(dismissCartNotice, noticeDuration);
    return () => window.clearTimeout(timeout);
  }, [noticeId, dismissCartNotice]);

  if (!cartNotice || !book) return null;

  function openCart() {
    dismissCartNotice();
    document.getElementById("store-cart-trigger")?.click();
  }

  return (
    <aside className="cart-added-toast" key={cartNotice.id} role="status" aria-live="polite" aria-atomic="true">
      <div className="cart-toast-progress" aria-hidden="true"><span /></div>
      <div className="cart-toast-heading">
        <div className="cart-toast-success"><span><Check size={15} /></span><strong>تمت إضافة الكتاب إلى السلة</strong></div>
        <button type="button" className="cart-toast-close" onClick={dismissCartNotice} aria-label="إغلاق الإشعار"><X size={18} /></button>
      </div>
      <div className="cart-toast-book">
        <div className={`cart-toast-cover ${book.cover}`} aria-hidden="true"><BookOpen size={21} /></div>
        <div className="cart-toast-book-info"><strong>{book.title}</strong><span>أضيف إلى سلة التسوق</span></div>
        <strong className="cart-toast-price">{formatPrice(book.price)}</strong>
      </div>
      <div className="cart-toast-actions">
        <button type="button" className="cart-toast-view" onClick={openCart}>عرض السلة</button>
        <button type="button" className="cart-toast-continue" onClick={dismissCartNotice}>متابعة التسوق</button>
      </div>
    </aside>
  );
}
