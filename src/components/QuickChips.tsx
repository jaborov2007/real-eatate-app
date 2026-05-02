"use client";

type Mode = "rent" | "sale";
type RentTerm = "any" | "short" | "long";

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
  return (
    <div className="px-4 py-3 border-b bg-white">
      <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto">
        <Chip active={mode === "rent"} onClick={() => onModeChange("rent")}>
          For rent
        </Chip>
        <Chip active={mode === "sale"} onClick={() => onModeChange("sale")}>
          For sale
        </Chip>

        {mode === "rent" && (
          <>
            <Chip
              active={rentTerm === "short"}
              onClick={() => onRentTermChange("short")}
            >
              Daily rent
            </Chip>
            <Chip
              active={rentTerm === "long"}
              onClick={() => onRentTermChange("long")}
            >
              Long-term
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
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
        active
          ? "bg-black text-white"
          : "bg-gray-100 text-gray-800 active:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
