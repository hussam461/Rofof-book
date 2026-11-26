"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useStore } from "@/components/store-provider";

export function BookActions({ bookId, title }: { bookId: string; title: string }) {
  const { favorites, addToCart, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(bookId);

  return (
    <div
      className="book-actions book-actions-stack"
      style={{ position: "absolute", display: "block", top: 12, right: "auto", bottom: "auto", left: 12, width: 37, height: 82 }}
    >
      <button className="quick-add" style={{ position: "absolute", top: 45, right: "auto", bottom: "auto", left: 0, width: 37, height: 37, margin: 0 }} type="button" onClick={() => addToCart(bookId)} aria-label={`إضافة ${title} إلى السلة`}>
        <ShoppingCart size={17} />
        <span className="action-tooltip" aria-hidden="true">أضف إلى السلة</span>
      </button>
      <button className={`favorite-book${isFavorite ? " is-favorite" : ""}`} style={{ position: "absolute", top: 0, right: "auto", bottom: "auto", left: 0, width: 37, height: 37, margin: 0 }} type="button" onClick={() => toggleFavorite(bookId)} aria-label={isFavorite ? `إزالة ${title} من الرغبات` : `إضافة ${title} إلى الرغبات`} aria-pressed={isFavorite}>
        <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        <span className="action-tooltip" aria-hidden="true">{isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}</span>
      </button>
    </div>
  );
}
