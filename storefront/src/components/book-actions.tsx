"use client";

import { Check, Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/components/store-provider";

export function BookActions({ bookId, title }: { bookId: string; title: string }) {
  const { cart, favorites, addToCart, toggleFavorite } = useStore();
  const inCart = cart.some((item) => item.bookId === bookId);
  const isFavorite = favorites.includes(bookId);

  return (
    <div className="book-actions">
      <button className={`quick-add${inCart ? " is-added" : ""}`} type="button" onClick={() => addToCart(bookId)} aria-label={inCart ? `أضيف ${title} إلى السلة` : `إضافة ${title} إلى السلة`}>
        {inCart ? <Check size={17} /> : <ShoppingBag size={17} />}
      </button>
      <button className={`favorite-book${isFavorite ? " is-favorite" : ""}`} type="button" onClick={() => toggleFavorite(bookId)} aria-label={isFavorite ? `إزالة ${title} من الرغبات` : `إضافة ${title} إلى الرغبات`} aria-pressed={isFavorite}>
        <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
