"use client";

import CitySelect from "@/components/CitySelect";

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
    <div className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <CitySelect value={cityId} onChange={onCityChange} />

        <div
          onClick={onOpenFilters}
          className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 text-gray-600 cursor-pointer active:bg-gray-200"
        >
          <span className="text-gray-500">🔍</span>
          <span className="text-sm flex-1 truncate">Filters</span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFilters();
            }}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-600"
            aria-label="Open filters"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <circle cx="9" cy="6" r="2" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <circle cx="15" cy="12" r="2" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle cx="11" cy="18" r="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
