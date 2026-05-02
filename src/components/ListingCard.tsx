import Image from "next/image";

export type Listing = {
  id: string;
  price: string;
  facts: string;
  district: string;
  freshness: string;
  imageUrl?: string;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <a
      href={`/listings/${listing.id}`}
      className="block border-b border-gray-200 active:bg-gray-50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={listing.imageUrl ?? "/demo/apt1.jpg"}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
        />

        {/* Freshness badge */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-xs font-medium text-gray-700">
          {listing.freshness}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3 space-y-1">
        {/* Price */}
        <div className="text-[22px] leading-tight font-semibold text-gray-900">
          {listing.price}
        </div>

        {/* Facts */}
        <div className="text-sm text-gray-700">{listing.facts}</div>

        {/* Location */}
        <div className="text-sm text-gray-500">{listing.district}</div>
      </div>
    </a>
  );
}
