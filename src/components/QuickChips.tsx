"use client";

import type { Mode, RentTerm } from "@/data/listings";
import { useLang } from "@/context/LangContext";

export default function QuickChips({
  mode,
  rentTerm,
  onModeChange,
  onRentTermChange,
}: {
  mode: Mode;
  rentTerm: RentTerm;
  onModeChange: (m: Mode) => void;
  onRentTermChange: (t: RentTerm) => void;
}) {
  const { t } = useLang();

  return (
    <div className="bg-white border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        <Chip active={mode === "rent"} onClick={() => onModeChange("rent")}>
          {t("forRent")}
        </Chip>
        <Chip active={mode === "sale"} onClick={() => onModeChange("sale")}>
          {t("forSale")}
        </Chip>

        {mode === "rent" && (
          <>
            <div className="w-px bg-gray-200 mx-1 shrink-0" />
            <Chip
              active={rentTerm === "short"}
              onClick={() => onRentTermChange("short")}
            >
              {t("daily")}
            </Chip>
            <Chip
              active={rentTerm === "long"}
              onClick={() => onRentTermChange("long")}
            >
              {t("longTerm")}
            </Chip>
          </>
        )}
      </div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--color-primary)] text-white shadow-sm"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
