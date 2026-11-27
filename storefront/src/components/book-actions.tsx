"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useStore } from "@/components/store-provider";

export function BookActions({ bookId, title }: { bookId: string; title: string }) {
  const { favorites, addToCart, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(bookId);

  return (
    <div
      className="book-actions book-actions-stack"
      style={{ position: "absolute", display: "block", top: 8, right: "auto", bottom: "auto", left: -4, width: 30, height: 58 }}
    >
      <button className="quick-add" style={{ position: "absolute", top: 28, right: "auto", bottom: "auto", left: 0, width: 30, height: 30, margin: 0 }} type="button" onClick={() => addToCart(bookId)} aria-label={`إضافة ${title} إلى السلة`}>
        <ShoppingCart size={17} />
        <span className="action-tooltip" aria-hidden="true">أضف إلى السلة</span>
      </button>
      <button className={`favorite-book${isFavorite ? " is-favorite" : ""}`} style={{ position: "absolute", top: 0, right: "auto", bottom: "auto", left: 0, width: 30, height: 30, margin: 0, color: isFavorite ? "#d94f45" : undefined }} type="button" onClick={() => toggleFavorite(bookId)} aria-label={isFavorite ? `إزالة ${title} من الرغبات` : `إضافة ${title} إلى الرغبات`} aria-pressed={isFavorite}>
        <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        <span className="action-tooltip" aria-hidden="true">{isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}</span>
      </button>
    </div>
  );
}
