"use client";

import { useMemo, useState } from "react";

type City = { id: string; name: string };

const PINNED: City[] = [
  { id: "dushanbe", name: "Dushanbe" },
  { id: "khujand", name: "Khujand" },
  { id: "bokhtar", name: "Bokhtar" },
  { id: "kulob", name: "Kulob" },
];

// Example full list. Replace with your real Tajikistan city list later.
const ALL_CITIES: City[] = [
  ...PINNED,
  { id: "hisor", name: "Hisor" },
  { id: "istaravshan", name: "Istaravshan" },
  { id: "tursunzade", name: "Tursunzade" },
  { id: "vahdat", name: "Vahdat" },
  { id: "panjakent", name: "Panjakent" },
];

export default function CitySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (cityId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const { pinned, rest } = useMemo(() => {
    const pinnedIds = new Set(PINNED.map((c) => c.id));
    const pinned = PINNED;
    const rest = ALL_CITIES.filter((c) => !pinnedIds.has(c.id)).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return { pinned, rest };
  }, []);

  const currentName =
    ALL_CITIES.find((c) => c.id === value)?.name ?? "Dushanbe";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-10 px-3 rounded-full bg-gray-100 text-gray-900 text-sm font-medium flex items-center gap-1 active:bg-gray-200"
      >
        <span className="truncate max-w-[120px]">{currentName}</span>
        <span className="text-gray-500">▾</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close city dropdown"
          />
          <div className="absolute z-50 mt-2 w-72 max-w-[85vw] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="max-h-[60vh] overflow-auto py-2">
              {pinned.map((c) => (
                <CityRow
                  key={c.id}
                  city={c}
                  active={c.id === value}
                  onPick={(id) => {
                    onChange(id);
                    setOpen(false);
                  }}
                />
              ))}

              <div className="my-2 h-px bg-gray-200" />

              {rest.map((c) => (
                <CityRow
                  key={c.id}
                  city={c}
                  active={c.id === value}
                  onPick={(id) => {
                    onChange(id);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CityRow({
  city,
  active,
  onPick,
}: {
  city: City;
  active: boolean;
  onPick: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(city.id)}
      className={`w-full px-4 py-3 text-left text-sm flex items-center justify-between ${
        active ? "bg-gray-100 text-gray-900" : "text-gray-800 hover:bg-gray-50"
      }`}
    >
      <span>{city.name}</span>
      {active && <span className="text-gray-500">✓</span>}
    </button>
  );
}
