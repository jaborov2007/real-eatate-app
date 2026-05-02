export type Mode = "rent" | "sale";
export type RentTerm = "any" | "short" | "long";
export type PropertyType = "apartment" | "house" | "commercial";

export interface Listing {
  id: string;
  price: string;
  priceNote?: string;
  facts: string;
  district: string;
  freshness: string;
  images: string[];
  cityId: string;
  mode: Mode;
  propertyType: PropertyType;
  rooms: number;
  area: number;
  floor?: string;
  description: string;
  seller: {
    name: string;
    avatar: string;
    phone: string;
    online: boolean;
  };
}

export const listings: Listing[] = [
  {
    id: "1",
    price: "$400/mo",
    priceNote: "Utilities included",
    facts: "2 bd · 1 ba · 70 m²",
    district: "Dushanbe · Ismoili Somoni",
    freshness: "Active today",
    images: ["/images/apt1.jpg", "/images/interior1.jpg", "/images/interior2.jpg"],
    cityId: "dushanbe",
    mode: "rent",
    propertyType: "apartment",
    rooms: 2,
    area: 70,
    floor: "3/9",
    description:
      "Bright, fully furnished apartment in the heart of Ismoili Somoni district. Recently renovated with modern appliances. Walking distance to shops, cafes, and public transport. Ideal for a small family or young professionals.",
    seller: {
      name: "Farkhod Rahimov",
      avatar: "/images/avatar1.jpg",
      phone: "+992 90 123 4567",
      online: true,
    },
  },
  {
    id: "2",
    price: "$85,000",
    facts: "3 bd · 2 ba · 90 m²",
    district: "Khujand · Center",
    freshness: "Posted 1h ago",
    images: ["/images/apt2.jpg", "/images/apt3.jpg", "/images/interior1.jpg"],
    cityId: "khujand",
    mode: "sale",
    propertyType: "apartment",
    rooms: 3,
    area: 90,
    floor: "5/12",
    description:
      "Spacious 3-bedroom apartment in the center of Khujand. Euro-renovation, panoramic windows with city view. Two balconies, built-in kitchen, air conditioning in every room. Perfect for a growing family.",
    seller: {
      name: "Madina Karimova",
      avatar: "/images/avatar2.jpg",
      phone: "+992 92 987 6543",
      online: false,
    },
  },
  {
    id: "3",
    price: "$250/mo",
    priceNote: "Without utilities",
    facts: "1 bd · 1 ba · 45 m²",
    district: "Dushanbe · Sino",
    freshness: "Posted 3h ago",
    images: ["/images/apt3.jpg", "/images/interior2.jpg"],
    cityId: "dushanbe",
    mode: "rent",
    propertyType: "apartment",
    rooms: 1,
    area: 45,
    floor: "7/16",
    description:
      "Cozy one-bedroom apartment with modern finishes. Located in a quiet neighborhood with parks nearby. Includes washing machine, refrigerator, and high-speed internet. Perfect for students or singles.",
    seller: {
      name: "Farkhod Rahimov",
      avatar: "/images/avatar1.jpg",
      phone: "+992 90 123 4567",
      online: true,
    },
  },
  {
    id: "4",
    price: "$120,000",
    facts: "4 bd · 2 ba · 180 m²",
    district: "Dushanbe · Firdavsi",
    freshness: "Posted yesterday",
    images: ["/images/house1.jpg", "/images/house2.jpg", "/images/house3.jpg"],
    cityId: "dushanbe",
    mode: "sale",
    propertyType: "house",
    rooms: 4,
    area: 180,
    description:
      "Beautiful private house with a large garden and garage. Two floors, modern design, underfloor heating. Quiet residential area with good infrastructure. 10 minutes to city center by car.",
    seller: {
      name: "Madina Karimova",
      avatar: "/images/avatar2.jpg",
      phone: "+992 92 987 6543",
      online: false,
    },
  },
  {
    id: "5",
    price: "$800/mo",
    facts: "Office · 120 m²",
    district: "Dushanbe · Rudaki Ave",
    freshness: "Active today",
    images: ["/images/commercial1.jpg", "/images/commercial2.jpg"],
    cityId: "dushanbe",
    mode: "rent",
    propertyType: "commercial",
    rooms: 3,
    area: 120,
    floor: "2/5",
    description:
      "Modern office space on prestigious Rudaki Avenue. Open floor plan with meeting room and kitchen area. High-speed internet, air conditioning, 24/7 security. Ideal for IT companies or consulting firms.",
    seller: {
      name: "Farkhod Rahimov",
      avatar: "/images/avatar1.jpg",
      phone: "+992 90 123 4567",
      online: true,
    },
  },
  {
    id: "6",
    price: "$55,000",
    facts: "2 bd · 1 ba · 65 m²",
    district: "Khujand · Microrayon",
    freshness: "Posted 2 days ago",
    images: ["/images/apt1.jpg", "/images/interior1.jpg"],
    cityId: "khujand",
    mode: "sale",
    propertyType: "apartment",
    rooms: 2,
    area: 65,
    floor: "2/5",
    description:
      "Affordable 2-bedroom apartment in a well-maintained building. Clean entrance, new elevator. Close to school, market, and bus stop. Great investment opportunity.",
    seller: {
      name: "Madina Karimova",
      avatar: "/images/avatar2.jpg",
      phone: "+992 92 987 6543",
      online: false,
    },
  },
  {
    id: "7",
    price: "$350/mo",
    facts: "2 bd · 1 ba · 75 m²",
    district: "Bokhtar · Center",
    freshness: "Posted 5h ago",
    images: ["/images/apt2.jpg", "/images/interior2.jpg", "/images/apt3.jpg"],
    cityId: "bokhtar",
    mode: "rent",
    propertyType: "apartment",
    rooms: 2,
    area: 75,
    floor: "4/9",
    description:
      "Freshly renovated apartment in the center of Bokhtar. All new furniture and appliances. Balcony with mountain view. Available for long-term rental with flexible terms.",
    seller: {
      name: "Farkhod Rahimov",
      avatar: "/images/avatar1.jpg",
      phone: "+992 90 123 4567",
      online: true,
    },
  },
  {
    id: "8",
    price: "$95,000",
    facts: "3 bd · 2 ba · 150 m²",
    district: "Kulob · Vose St",
    freshness: "Posted today",
    images: ["/images/house2.jpg", "/images/house3.jpg", "/images/house1.jpg"],
    cityId: "kulob",
    mode: "sale",
    propertyType: "house",
    rooms: 3,
    area: 150,
    description:
      "Comfortable family house with courtyard and fruit trees. Recently renovated kitchen and bathrooms. Gas heating, city water supply. Peaceful neighborhood perfect for families.",
    seller: {
      name: "Madina Karimova",
      avatar: "/images/avatar2.jpg",
      phone: "+992 92 987 6543",
      online: false,
    },
  },
];
