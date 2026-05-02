"use client";

import { useMemo, useState } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { useLang } from "@/context/LangContext";

type City = { id: string; name: string };

const PINNED: City[] = [
  { id: "dushanbe", name: "Душанбе" },
  { id: "khujand", name: "Худжанд" },
  { id: "bokhtar", name: "Бохтар" },
  { id: "kulob", name: "Кулоб" },
  { id: "istaravshan", name: "Истаравшан" },
];

const ALL_CITIES: City[] = [
  ...PINNED,
  { id: "hisor", name: "Ҳисор" },
  { id: "tursunzade", name: "Турсунзода" },
  { id: "vahdat", name: "Ваҳдат" },
  { id: "panjakent", name: "Панҷакент" },
  { id: "konibodom", name: "Конибодом" },
  { id: "isfara", name: "Исфара" },
  { id: "norak", name: "Нурек" },
  { id: "rogun", name: "Роғун" },
  { id: "dangara", name: "Дангара" },
  { id: "farkhor", name: "Фархор" },
  { id: "vose", name: "Восеъ" },
  { id: "levakant", name: "Леваканд" },
  { id: "sarband", name: "Сарбанд" },
  { id: "taboshar", name: "Табошар" },
  { id: "ghafurov", name: "Ғафуров" },
  { id: "spitamen", name: "Спитамен" },
  { id: "buston", name: "Бустон" },
  { id: "shahrinav", name: "Шаҳринав" },
  { id: "fayzabad", name: "Файзобод" },
  { id: "rasht", name: "Рашт" },
  { id: "jirgital", name: "Ҷиргитол" },
  { id: "khorog", name: "Хоруғ" },
  { id: "murghab", name: "Мурғоб" },
  { id: "ishkoshim", name: "Ишкошим" },
  { id: "ayni", name: "Айнӣ" },
  { id: "shahriston", name: "Шаҳристон" },
  { id: "devashtich", name: "Деваштич" },
  { id: "yovon", name: "Ёвон" },
  { id: "jomi", name: "Ҷомӣ" },
  { id: "hamadoni", name: "Ҳамадонӣ" },
  { id: "temurmalik", name: "Темурмалик" },
  { id: "nosiri-khusrav", name: "Носири Хусрав" },
  { id: "shuroobod", name: "Шӯрообод" },
  { id: "muminobod", name: "Муъминобод" },
  { id: "baljuvon", name: "Балҷувон" },
  { id: "hovaling", name: "Ховалинг" },
  { id: "tojikobod", name: "Тоҷикобод" },
  { id: "sangvor", name: "Сангвор" },
  { id: "lakhsh", name: "Лахш" },
  { id: "nurobod", name: "Нуробод" },
  { id: "rudaki", name: "Рудакӣ" },
  { id: "darvoz", name: "Дарвоз" },
  { id: "vanj", name: "Ванҷ" },
  { id: "rushan", name: "Рушон" },
  { id: "shugnan", name: "Шуғнон" },
  { id: "roshtqala", name: "Рошткала" },
];

export default function CitySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (cityId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  const { pinned, rest } = useMemo(() => {
    const pinnedIds = new Set(PINNED.map((c) => c.id));
    return {
      pinned: PINNED,
      rest: ALL_CITIES.filter((c) => !pinnedIds.has(c.id)).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    };
  }, []);

  const currentName =
    ALL_CITIES.find((c) => c.id === value)?.name ?? "Душанбе";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-11 px-4 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm font-semibold flex items-center gap-2 hover:bg-blue-100 transition-colors"
      >
        <MapPin size={16} />
        <span className="truncate max-w-[100px]">{currentName}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close city dropdown"
          />
          <div className="absolute z-50 mt-2 w-72 max-w-[85vw] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-xl animate-scaleIn origin-top-left">
            <div className="p-2 border-b border-[var(--color-border)]">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1">
                {t("popularCities")}
              </p>
            </div>
            <div className="max-h-[60vh] overflow-auto py-1 custom-scrollbar">
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

              <div className="mx-3 my-1.5 h-px bg-gray-100" />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-1">
                {t("allCities")}
              </p>

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
      className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between rounded-lg mx-1 transition-colors ${
        active
          ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium"
          : "text-gray-700 hover:bg-gray-50"
      }`}
      style={{ width: "calc(100% - 8px)" }}
    >
      <span>{city.name}</span>
      {active && <Check size={16} className="text-[var(--color-primary)]" />}
    </button>
  );
}
