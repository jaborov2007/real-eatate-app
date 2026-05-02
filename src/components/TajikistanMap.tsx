"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { listings } from "@/data/listings";

const cityCoords: Record<string, [number, number]> = {
  dushanbe: [38.5598, 68.7738],
  khujand: [40.2833, 69.6333],
  bokhtar: [37.8333, 68.7667],
  kulob: [37.9167, 69.7833],
  istaravshan: [39.9167, 69.0000],
  hisor: [38.5167, 68.5500],
  tursunzade: [38.5128, 68.2317],
  vahdat: [38.5500, 69.0167],
  panjakent: [39.4950, 67.6100],
  konibodom: [40.2917, 70.4250],
  isfara: [40.1267, 70.6250],
  norak: [38.3833, 69.3167],
  khorog: [37.5361, 71.5117],
};

function seededOffset(id: string, coord: number, axis: number): number {
  let hash = 0;
  const key = id + axis;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  return coord + ((hash % 100) / 100) * 0.02;
}

function createPriceIcon(price: string) {
  return L.divIcon({
    className: "custom-price-marker",
    html: `<div style="
      background: #2563eb;
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(37,99,235,0.4);
      border: 2px solid white;
    ">${price}</div>`,
    iconSize: [0, 0],
    iconAnchor: [40, 16],
  });
}

export default function TajikistanMap() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.custom-price-marker { background: none !important; border: none !important; }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const markers = useMemo(() =>
    listings.map((listing) => {
      const coords = cityCoords[listing.cityId];
      if (!coords) return null;
      const position: [number, number] = [
        seededOffset(listing.id, coords[0], 0),
        seededOffset(listing.id, coords[1], 1),
      ];
      return { listing, position };
    }).filter(Boolean) as { listing: (typeof listings)[number]; position: [number, number] }[], []);

  return (
    <MapContainer
      center={[38.86, 69.3]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(({ listing, position }) => (
        <Marker
          key={listing.id}
          position={position}
          icon={createPriceIcon(listing.price)}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>{listing.price}</p>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 2px" }}>{listing.facts}</p>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{listing.district}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
