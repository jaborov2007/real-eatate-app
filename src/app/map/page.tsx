"use client";

import Link from "next/link";
import { MapPin, Navigation, List } from "lucide-react";
import { listings } from "@/data/listings";

export default function MapPage() {
  return (
    <div className="relative" style={{ height: "calc(100vh - 64px - 56px)" }}>
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center mx-auto mb-4">
            <MapPin size={32} className="text-[var(--color-primary)]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Map View
          </h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Interactive map with property locations. Connect a map API (Google Maps, Mapbox) to enable full functionality.
          </p>
        </div>

        {/* Fake map pins */}
        <div className="absolute top-[20%] left-[30%] animate-bounce">
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg text-xs font-bold">
            $400
          </div>
        </div>
        <div className="absolute top-[40%] left-[55%]">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg text-xs font-bold">
            $250
          </div>
        </div>
        <div className="absolute top-[60%] left-[25%]">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg text-xs font-bold">
            $120k
          </div>
        </div>
        <div className="absolute top-[35%] left-[75%]">
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg text-xs font-bold">
            $800
          </div>
        </div>
      </div>

      {/* Bottom listing preview */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-border)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Navigation size={16} className="text-[var(--color-primary)]" />
              <span className="text-sm font-semibold text-[var(--color-text)]">
                {listings.length} properties nearby
              </span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary)]"
            >
              <List size={14} />
              List view
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
