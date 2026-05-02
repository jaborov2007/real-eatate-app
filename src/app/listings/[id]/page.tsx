"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Ruler,
  BedDouble,
  Building,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { listings } from "@/data/listings";
import { useLang } from "@/context/LangContext";

export default function ListingDetailPage() {
  const params = useParams();
  const listing = listings.find((l) => l.id === params.id) ?? listings[0];
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const { t } = useLang();

  const prevImage = () =>
    setCurrentImage((i) => (i === 0 ? listing.images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImage((i) => (i === listing.images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Image Gallery */}
      <div className="relative bg-gray-900">
        <div className="relative aspect-[4/3] md:aspect-[16/9] max-h-[500px]">
          <Image
            src={listing.images[currentImage]}
            alt={listing.district}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <Heart
                  size={20}
                  className={liked ? "text-red-500 fill-red-500" : ""}
                />
              </button>
              <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {listing.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {listing.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentImage
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
            {currentImage + 1} / {listing.images.length}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <div className="p-5 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-text)]">
                  {listing.price}
                </h1>
                {listing.priceNote && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {listing.priceNote}
                  </p>
                )}
              </div>
              <span
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  listing.mode === "rent"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {listing.mode === "rent" ? t("forRent") : t("forSale")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FactCard
              icon={<BedDouble size={20} />}
              label={t("rooms")}
              value={String(listing.rooms)}
            />
            <FactCard
              icon={<Ruler size={20} />}
              label={t("area")}
              value={`${listing.area} m²`}
            />
            {listing.floor && (
              <FactCard
                icon={<Building size={20} />}
                label={t("floor")}
                value={listing.floor}
              />
            )}
            <FactCard
              icon={<MapPin size={20} />}
              label={t("district")}
              value={listing.district.split(" · ").pop() ?? ""}
            />
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} className="text-[var(--color-primary)] shrink-0" />
            <span className="text-sm font-medium">{listing.district}</span>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-auto">
              {listing.freshness}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">
              {t("description")}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {listing.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                {listing.seller.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[var(--color-text)] truncate">
                  {listing.seller.name}
                </p>
                <p className="text-xs text-gray-500">
                  {listing.seller.online ? t("online") : t("lastSeen")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-[var(--color-border)] p-4">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <Link
              href={`/chat/${listing.id}`}
              className="flex-1 bg-[var(--color-primary)] text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-blue-500/20"
            >
              <MessageCircle size={18} />
              {t("writeMessage")}
            </Link>
            <a
              href={`tel:${listing.seller.phone}`}
              className="flex-1 border-2 border-[var(--color-border)] py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-[var(--color-text)] hover:bg-gray-50 transition-colors"
            >
              <Phone size={18} />
              {t("call")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] p-3 flex items-center gap-3">
      <div className="text-[var(--color-primary)]">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-[var(--color-text)]">{value}</p>
      </div>
    </div>
  );
}
