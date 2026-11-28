"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useStore } from "@/components/store-provider";

export function BookActions({ bookId, title }: { bookId: string; title: string }) {
  const { favorites, addToCart, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(bookId);

  return (
    <div className="book-actions book-actions-stack">
      <button className="quick-add" type="button" onClick={() => addToCart(bookId)} aria-label={`إضافة ${title} إلى السلة`}>
        <ShoppingCart size={17} />
        <span className="action-tooltip" aria-hidden="true">أضف إلى السلة</span>
      </button>
      <button className={`favorite-book${isFavorite ? " is-favorite" : ""}`} style={{ color: isFavorite ? "#d94f45" : undefined }} type="button" onClick={() => toggleFavorite(bookId)} aria-label={isFavorite ? `إزالة ${title} من الرغبات` : `إضافة ${title} إلى الرغبات`} aria-pressed={isFavorite}>
        <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        <span className="action-tooltip" aria-hidden="true">{isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}</span>
      </button>
    </div>
  );
}
