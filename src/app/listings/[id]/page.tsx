import Image from "next/image";

export default function ListingDetailPage() {
  // fake data for skeleton
  const listing = {
    price: "$400",
    facts: "2 bd · 70 m²",
    district: "Dushanbe · Ismoili Somoni",
    freshness: "Active today",
    description:
      "Clean apartment, good light, close to shops and transport. Available immediately.",
    images: [
      "/demo/house-one.webp",
      "/demo/house-two.webp",
      "/demo/house-one.webp",
    ],
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Gallery */}
      <div className="relative aspect-[4/3] bg-gray-200">
        <Image
          src={listing.images[0]}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <div className="text-2xl font-semibold text-gray-900">
            {listing.price}
          </div>
          <div className="text-sm text-gray-700">{listing.facts}</div>
          <div className="text-sm text-gray-500">{listing.district}</div>
          <div className="text-xs text-green-600 mt-1">{listing.freshness}</div>
        </div>

        <div className="text-sm text-gray-800 leading-relaxed">
          {listing.description}
        </div>
      </div>

      {/* Sticky actions (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 md:static border-t bg-white p-3 flex gap-3">
        <button className="flex-1 bg-green-600 text-white py-3 rounded text-sm font-medium">
          Chat
        </button>
        <button className="flex-1 border border-gray-300 py-3 rounded text-sm font-medium">
          Call
        </button>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
