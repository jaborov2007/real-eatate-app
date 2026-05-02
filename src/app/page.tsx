"use client";

import { useMemo, useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchHeader from "@/components/SearchHeader";
import QuickChips from "@/components/QuickChips";
import SearchModal from "@/components/SearchModal";

type Mode = "rent" | "sale";
type RentTerm = "any" | "short" | "long";
type PropertyType = "apartment" | "house" | "commercial";

const listings = [
  {
    id: "1",
    price: "$400",
    facts: "2 bd · 70 m²",
    district: "Dushanbe · Ismoili Somoni",
    freshness: "Active today",
    imageUrl: "/demo/house-one.webp",
    cityId: "dushanbe",
    mode: "rent" as Mode,
  },
  {
    id: "2",
    price: "$550",
    facts: "3 bd · 90 m²",
    district: "Khujand · Center",
    freshness: "Posted 1h ago",
    imageUrl: "/demo/house-two.webp",
    cityId: "khujand",
    mode: "sale" as Mode,
  },
];

export default function Home() {
  const [cityId, setCityId] = useState("dushanbe");
  const [mode, setMode] = useState<Mode>("rent");
  const [rentTerm, setRentTerm] = useState<RentTerm>("any");

  const [filtersOpen, setFiltersOpen] = useState(false);

  // advanced filters (start simple)
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

      <div className="max-w-6xl mx-auto px-4 py-4 space-y-6">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </>
  );
}
