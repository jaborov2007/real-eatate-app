"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Mode, RentTerm, PropertyType } from "@/data/listings";
import { useLang } from "@/context/LangContext";

type DraftState = {
  mode: Mode;
  rentTerm: RentTerm;
  propertyType: PropertyType;
  rooms: string;
  priceMin: string;
  priceMax: string;
};

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
  onApply: (next: DraftState) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <ModalContent
      key={String(open)}
      initial={{ mode, rentTerm, propertyType, rooms, priceMin, priceMax }}
      onClose={onClose}
      onApply={onApply}
    />
  );
}

function ModalContent({
  initial,
  onClose,
  onApply,
}: {
  initial: DraftState;
  onClose: () => void;
  onApply: (next: DraftState) => void;
}) {
  const [draft, setDraft] = useState(initial);
  const { t } = useLang();

  return (
    <div className="fixed inset-0 z-50 animate-fadeIn">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div
        className="absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-2xl animate-slideDown md:max-w-lg md:mx-auto md:mt-20 md:rounded-2xl md:top-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-lg mx-auto px-5 pt-5 pb-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--color-text)]">{t("filters")}</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          <section className="space-y-3">
            <label className="text-sm font-semibold text-[var(--color-text)]">
              {t("dealType")}
            </label>
            <div className="flex gap-2">
              <Pill
                active={draft.mode === "rent"}
                onClick={() => setDraft((d) => ({ ...d, mode: "rent" }))}
              >
                {t("forRent")}
              </Pill>
              <Pill
                active={draft.mode === "sale"}
                onClick={() =>
                  setDraft((d) => ({ ...d, mode: "sale", rentTerm: "any" }))
                }
              >
                {t("forSale")}
              </Pill>
            </div>

            {draft.mode === "rent" && (
              <div className="flex gap-2 pt-1">
                <Pill
                  active={draft.rentTerm === "short"}
                  onClick={() => setDraft((d) => ({ ...d, rentTerm: "short" }))}
                >
                  {t("daily")}
                </Pill>
                <Pill
                  active={draft.rentTerm === "long"}
                  onClick={() => setDraft((d) => ({ ...d, rentTerm: "long" }))}
                >
                  {t("longTerm")}
                </Pill>
              </div>
            )}
          </section>

          <section className="space-y-3">
            <label className="text-sm font-semibold text-[var(--color-text)]">
              {t("propertyType")}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["apartment", "house", "commercial"] as const).map((type) => (
                <Pill
                  key={type}
                  active={draft.propertyType === type}
                  onClick={() => setDraft((d) => ({ ...d, propertyType: type }))}
                >
                  {t(type)}
                </Pill>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <label className="text-sm font-semibold text-[var(--color-text)]">
              {t("priceRange")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={t("min")}
                value={draft.priceMin}
                onChange={(v) => setDraft((d) => ({ ...d, priceMin: v }))}
                placeholder="$0"
              />
              <Input
                label={t("max")}
                value={draft.priceMax}
                onChange={(v) => setDraft((d) => ({ ...d, priceMax: v }))}
                placeholder="$1,000"
              />
            </div>
          </section>

          <section className="space-y-3">
            <label className="text-sm font-semibold text-[var(--color-text)]">
              {t("rooms")}
            </label>
            <div className="flex gap-2">
              {["1", "2", "3", "4+"].map((r) => (
                <Pill
                  key={r}
                  active={draft.rooms === r}
                  onClick={() =>
                    setDraft((d) => ({ ...d, rooms: d.rooms === r ? "" : r }))
                  }
                >
                  {r}
                </Pill>
              ))}
            </div>
          </section>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                setDraft({
                  mode: "rent",
                  rentTerm: "any",
                  propertyType: "apartment",
                  rooms: "",
                  priceMin: "",
                  priceMax: "",
                })
              }
              className="flex-1 py-3 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t("reset")}
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                onClose();
              }}
              className="flex-1 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-blue-500/20"
            >
              {t("apply")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--color-primary)] text-white shadow-sm"
          : "bg-gray-50 border border-[var(--color-border)] text-gray-700 hover:bg-gray-100"
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
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500 mb-1 block">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm text-[var(--color-text)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
      />
    </label>
  );
}
