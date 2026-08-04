import { CATEGORIES } from "../lib/categories";
import type { Category } from "../types";

interface CategoryChipsProps {
  activeCategoryId?: string;
  onSelect: (category: Category) => void;
}

export default function CategoryChips({ activeCategoryId, onSelect }: CategoryChipsProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {CATEGORIES.map((category) => {
        const isActive = category.id === activeCategoryId;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-semibold transition active:scale-95 ${
              isActive
                ? "bg-forest text-white"
                : "bg-white text-forest hover:bg-forest/10 dark:bg-night-card dark:text-sun dark:hover:bg-forest/20"
            }`}
          >
            <span aria-hidden="true">{category.emoji}</span>
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
