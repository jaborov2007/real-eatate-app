"use client";

import { useEffect, useState } from "react";

type Mode = "rent" | "sale";
type RentTerm = "any" | "short" | "long";
type PropertyType = "apartment" | "house" | "commercial";

export default function SearchModal({
  open,
  onClose,
  mode,
  rentTerm,
  propertyType,
  rooms,
  priceMin,
  priceMax,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  rentTerm: RentTerm;
  propertyType: PropertyType;
  rooms: string;
  priceMin: string;
  priceMax: string;
  onApply: (next: {
    mode: Mode;
    rentTerm: RentTerm;
    propertyType: PropertyType;
    rooms: string;
    priceMin: string;
    priceMax: string;
  }) => void;
}) {
  const [draft, setDraft] = useState({
    mode,
    rentTerm,
    propertyType,
    rooms,
    priceMin,
    priceMax,
  });

  useEffect(() => {
    if (open) {
      setDraft({ mode, rentTerm, propertyType, rooms, priceMin, priceMax });
    }
  }, [open, mode, rentTerm, propertyType, rooms, priceMin, priceMax]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/35" onClick={onClose} />

      <div
        className="absolute top-0 left-0 right-0 bg-white rounded-b-2xl animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-900">Filters</div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 text-sm font-medium"
            >
              Close
            </button>
          </div>

          {/* Mode */}
          <section className="space-y-2">
            <div className="text-sm font-semibold text-gray-900">Type</div>
            <div className="flex gap-2">
              <Pill
                active={draft.mode === "rent"}
                onClick={() => setDraft((d) => ({ ...d, mode: "rent" }))}
              >
                For rent
              </Pill>
              <Pill
                active={draft.mode === "sale"}
                onClick={() =>
                  setDraft((d) => ({ ...d, mode: "sale", rentTerm: "any" }))
                }
              >
                For sale
              </Pill>
            </div>

            {draft.mode === "rent" && (
              <div className="flex gap-2 pt-1">
                <Pill
                  active={draft.rentTerm === "short"}
                  onClick={() => setDraft((d) => ({ ...d, rentTerm: "short" }))}
                >
                  Daily
                </Pill>
                <Pill
                  active={draft.rentTerm === "long"}
                  onClick={() => setDraft((d) => ({ ...d, rentTerm: "long" }))}
                >
                  Long-term
                </Pill>
              </div>
            )}
          </section>

          {/* Price */}
          <section className="space-y-2">
            <div className="text-sm font-semibold text-gray-900">Price</div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Min"
                value={draft.priceMin}
                onChange={(v) => setDraft((d) => ({ ...d, priceMin: v }))}
                placeholder="0"
              />
              <Input
                label="Max"
                value={draft.priceMax}
                onChange={(v) => setDraft((d) => ({ ...d, priceMax: v }))}
                placeholder="1000"
              />
            </div>
          </section>

          {/* Property */}
          <section className="space-y-2">
            <div className="text-sm font-semibold text-gray-900">Property</div>
            <div className="grid grid-cols-3 gap-2">
              <Pill
                active={draft.propertyType === "apartment"}
                onClick={() =>
                  setDraft((d) => ({ ...d, propertyType: "apartment" }))
                }
              >
                Apartment
              </Pill>
              <Pill
                active={draft.propertyType === "house"}
                onClick={() =>
                  setDraft((d) => ({ ...d, propertyType: "house" }))
                }
              >
                House
              </Pill>
              <Pill
                active={draft.propertyType === "commercial"}
                onClick={() =>
                  setDraft((d) => ({ ...d, propertyType: "commercial" }))
                }
              >
                Commercial
              </Pill>
            </div>
          </section>

          {/* Rooms */}
          <section className="space-y-2">
            <div className="text-sm font-semibold text-gray-900">Rooms</div>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900"
              value={draft.rooms}
              onChange={(e) =>
                setDraft((d) => ({ ...d, rooms: e.target.value }))
              }
            >
              <option value="">Any</option>
              <option value="1">1 room</option>
              <option value="2">2 rooms</option>
              <option value="3">3 rooms</option>
              <option value="4">4+ rooms</option>
            </select>
          </section>

          <div className="pt-2">
            <button
              type="button"
              className="w-full bg-black text-white rounded-xl py-3 text-sm font-semibold active:bg-gray-900"
              onClick={() => {
                onApply(draft);
                onClose();
              }}
            >
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        active
          ? "bg-black text-white"
          : "bg-gray-100 text-gray-900 active:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-gray-600 mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
      />
    </label>
  );
}
