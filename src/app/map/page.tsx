"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Navigation, List } from "lucide-react";
import { listings } from "@/data/listings";
import { useLang } from "@/context/LangContext";

const MapContainer = dynamic(
  () => import("@/components/TajikistanMap"),
  { ssr: false, loading: () => (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse text-gray-400 text-sm">Loading map...</div>
    </div>
  )}
);

export default function MapPage() {
  const { t } = useLang();

  return (
    <div className="relative" style={{ height: "calc(100vh - 64px - 56px)" }}>
      <MapContainer />

      {/* Bottom listing preview */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000]">
        <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Navigation size={16} className="text-[var(--color-primary)]" />
              <span className="text-sm font-semibold text-[var(--color-text)]">
                {listings.length} {t("propertiesNearby")}
              </span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary)]"
            >
              <List size={14} />
              {t("listView")}
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {listings.slice(0, 4).map((l) => (
              <Link
                key={l.id}
                href={`/listings/${l.id}`}
                className="shrink-0 w-48 bg-gray-50 rounded-xl p-3 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
              >
                <p className="text-sm font-bold text-[var(--color-text)]">
                  {l.price}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{l.facts}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {l.district}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
