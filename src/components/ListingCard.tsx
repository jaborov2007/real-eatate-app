"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import type { Listing } from "@/data/listings";
import { useLang } from "@/context/LangContext";

export default function ListingCard({ listing }: { listing: Listing }) {
  const [liked, setLiked] = useState(false);
  const { t } = useLang();

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[var(--color-border)]"
    >
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        <Image
          src={listing.images[0]}
          alt={listing.district}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={18}
            className={liked ? "text-red-500 fill-red-500" : "text-gray-600"}
          />
        </button>

        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
          {listing.freshness}
        </div>

        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
            listing.mode === "rent"
              ? "bg-emerald-500 text-white"
              : "bg-[var(--color-primary)] text-white"
          }`}
        >
          {listing.mode === "rent" ? t("forRent") : t("forSale")}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-xl font-bold text-[var(--color-text)]">
            {listing.price}
          </div>
          {listing.priceNote && (
            <span className="text-xs text-gray-400">{listing.priceNote}</span>
          )}
        </div>

        <div className="text-sm font-medium text-gray-700">{listing.facts}</div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{listing.district}</span>
        </div>
      </div>
    </Link>
  );
}
