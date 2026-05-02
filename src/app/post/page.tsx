"use client";

import { useState } from "react";
import {
  Camera,
  MapPin,
  DollarSign,
  Home,
  BedDouble,
  Ruler,
  Building,
  FileText,
  Check,
} from "lucide-react";

export default function PostListingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<"rent" | "sale">("rent");
  const [propertyType, setPropertyType] = useState<
    "apartment" | "house" | "commercial"
  >("apartment");

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-5 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
          Listing Published!
        </h2>
        <p className="text-gray-500 mb-8">
          Your listing is now live and visible to all users. You will receive
          notifications when someone is interested.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Post Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Post a Listing
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details to publish your property
        </p>
      </div>

      {/* Photos */}
      <Section icon={<Camera size={20} />} title="Photos">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors">
            <Camera size={24} className="text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Add photo</span>
            <input type="file" accept="image/*" className="hidden" multiple />
          </label>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gray-100 border border-[var(--color-border)]"
            />
          ))}
        </div>
      </Section>

      {/* Deal type */}
      <Section icon={<DollarSign size={20} />} title="Deal Type">
        <div className="flex gap-3">
          <ToggleButton
            active={mode === "rent"}
            onClick={() => setMode("rent")}
          >
            For Rent
          </ToggleButton>
          <ToggleButton
            active={mode === "sale"}
            onClick={() => setMode("sale")}
          >
            For Sale
          </ToggleButton>
        </div>
      </Section>

      {/* Property type */}
      <Section icon={<Home size={20} />} title="Property Type">
        <div className="grid grid-cols-3 gap-3">
          {(["apartment", "house", "commercial"] as const).map((type) => (
            <ToggleButton
              key={type}
              active={propertyType === type}
              onClick={() => setPropertyType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </ToggleButton>
          ))}
        </div>
      </Section>

      {/* Details */}
      <Section icon={<BedDouble size={20} />} title="Details">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Rooms" placeholder="e.g. 2" type="number" />
          <FormInput label="Floor" placeholder="e.g. 3/9" />
        </div>
      </Section>

      <Section icon={<Ruler size={20} />} title="Area">
        <FormInput label="Total area (m²)" placeholder="e.g. 70" type="number" />
      </Section>

      {/* Price */}
      <Section icon={<DollarSign size={20} />} title="Price">
        <FormInput
          label={mode === "rent" ? "Monthly price ($)" : "Price ($)"}
          placeholder={mode === "rent" ? "e.g. 400" : "e.g. 85000"}
          type="number"
        />
      </Section>

      {/* Location */}
      <Section icon={<MapPin size={20} />} title="Location">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="City" placeholder="e.g. Dushanbe" />
          <FormInput label="District" placeholder="e.g. Ismoili Somoni" />
        </div>
        <FormInput label="Address" placeholder="Street, building number" />
      </Section>

      {/* Description */}
      <Section icon={<FileText size={20} />} title="Description">
        <textarea
          rows={4}
          placeholder="Describe your property: condition, furniture, nearby amenities..."
          className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 resize-none transition-all"
        />
      </Section>

      {/* Contact */}
      <Section icon={<Building size={20} />} title="Contact Info">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Your name" placeholder="e.g. Farkhod" />
          <FormInput label="Phone" placeholder="+992 90 123 4567" />
        </div>
      </Section>

      {/* Submit */}
      <button
        type="button"
        onClick={() => setSubmitted(true)}
        className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-semibold text-base hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-blue-500/20"
      >
        Publish Listing
      </button>

      <div className="h-4" />
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-[var(--color-primary)]">{icon}</div>
        <h2 className="text-base font-semibold text-[var(--color-text)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-gray-500 mb-1.5 block">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
      />
    </label>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--color-primary)] text-white shadow-sm"
          : "bg-gray-50 border border-[var(--color-border)] text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
