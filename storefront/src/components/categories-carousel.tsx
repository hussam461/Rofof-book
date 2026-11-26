"use client";

import { useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  BadgeCheck,
  BookHeart,
  BookOpenText,
  Brain,
  BriefcaseBusiness,
  Feather,
  FlaskConical,
  Landmark,
  LibraryBig,
  ScrollText,
  Sprout,
  type LucideIcon,
} from "lucide-react";

const categories: { name: string; icon: LucideIcon }[] = [
  { name: "سيرة ذاتية", icon: BookHeart },
  { name: "التربية", icon: Baby },
  { name: "فلسفة", icon: Brain },
  { name: "نصوص وخواطر", icon: ScrollText },
  { name: "كتب علمية", icon: FlaskConical },
  { name: "سياسة", icon: Landmark },
  { name: "عالم الأطفال", icon: Baby },
  { name: "كتب أصلية", icon: BadgeCheck },
  { name: "تاريخ", icon: LibraryBig },
  { name: "كتب دينية", icon: BookOpenText },
  { name: "إدارة وتسويق", icon: BriefcaseBusiness },
  { name: "تنمية", icon: Sprout },
  { name: "روايات", icon: BookOpenText },
  { name: "فواصل كتب", icon: Feather },
  { name: "قصص قصيرة", icon: ScrollText },
  { name: "تعليم ومعرفة", icon: LibraryBig },
  { name: "علوم وتقنية", icon: FlaskConical },
  { name: "كتب متنوعة", icon: BookOpenText },
];

const pageSize = 12;

export function CategoriesCarousel() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(categories.length / pageSize);
  const visibleCategories = categories.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section className="category-section shell" id="categories" aria-labelledby="categories-heading">
      <div className="category-title-wrap">
        <span className="category-title-ornament"><span /><BookOpenText size={25} /><span /></span>
        <h2 id="categories-heading">أقسام <em>الكتب</em></h2>
        <p>اكتشف عالماً جديداً من المعرفة والخيال</p>
      </div>

      <div className="category-grid-shell">
        <div className="category-toolbar">
          {pageCount > 1 ? (
            <div className="carousel-controls category-controls" aria-label="التنقل بين صفحات الأقسام">
              <button type="button" onClick={() => setPage((current) => Math.min(current + 1, pageCount - 1))} aria-label="التصنيفات التالية" disabled={page === pageCount - 1}>
                <ArrowLeft size={17} />
              </button>
              <button type="button" onClick={() => setPage((current) => Math.max(current - 1, 0))} aria-label="التصنيفات السابقة" disabled={page === 0}>
                <ArrowRight size={17} />
              </button>
            </div>
          ) : <span />}
        </div>

        <div className="category-grid">
          {visibleCategories.map(({ name, icon: Icon }, index) => (
            <a className="category-card" href="#books" key={name} aria-label={`قسم ${name}`} style={{ "--card-index": index } as CSSProperties}>
              <span className="category-medallion"><Icon size={43} strokeWidth={1.5} aria-hidden="true" /></span>
              <span className="category-card-bottom">
                <span className="category-slide-title">{name}</span>
                <span className="category-card-arrow"><ArrowLeft size={14} aria-hidden="true" /></span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
