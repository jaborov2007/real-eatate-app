"use client";

import { useMemo, useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchHeader from "@/components/SearchHeader";
import QuickChips from "@/components/QuickChips";
import SearchModal from "@/components/SearchModal";
import { listings } from "@/data/listings";
import type { Mode, RentTerm, PropertyType } from "@/data/listings";

export default function Home() {
  const [cityId, setCityId] = useState("dushanbe");
  const [mode, setMode] = useState<Mode>("rent");
  const [rentTerm, setRentTerm] = useState<RentTerm>("any");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [propertyType, setPropertyType] = useState<PropertyType>("apartment");
  const [rooms, setRooms] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const filtered = useMemo(() => {
    return listings
      .filter((l) => l.cityId === cityId)
      .filter((l) => l.mode === mode);
  }, [cityId, mode]);

  return (
    <>
      <SearchHeader
        cityId={cityId}
        onCityChange={setCityId}
        onOpenFilters={() => setFiltersOpen(true)}
      />

      <QuickChips
        mode={mode}
        rentTerm={rentTerm}
        onModeChange={(m) => {
          setMode(m);
          if (m === "sale") setRentTerm("any");
        }}
        onRentTermChange={setRentTerm}
      />

      <SearchModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        mode={mode}
        rentTerm={rentTerm}
        propertyType={propertyType}
        rooms={rooms}
        priceMin={priceMin}
        priceMax={priceMax}
        onApply={(next) => {
          setMode(next.mode);
          setRentTerm(next.rentTerm);
          setPropertyType(next.propertyType);
          setRooms(next.rooms);
          setPriceMin(next.priceMin);
          setPriceMax(next.priceMax);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-[var(--color-text)]">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "listing" : "listings"} found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No listings found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Try changing the city or adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
