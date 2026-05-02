"use client";

import CitySelect from "@/components/CitySelect";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchHeader({
  cityId,
  onCityChange,
  onOpenFilters,
}: {
  cityId: string;
  onCityChange: (cityId: string) => void;
  onOpenFilters: () => void;
}) {
  return (
    <div className="sticky top-14 md:top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <CitySelect value={cityId} onChange={onCityChange} />

        <div
          onClick={onOpenFilters}
          className="flex-1 flex items-center gap-3 bg-gray-50 border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-gray-500 cursor-pointer hover:border-gray-300 hover:bg-gray-100 transition-colors"
        >
          <Search size={18} className="text-gray-400 shrink-0" />
          <span className="text-sm flex-1 truncate">Search & Filters</span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFilters();
            }}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
            aria-label="Open filters"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
