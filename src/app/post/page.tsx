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
import { useLang } from "@/context/LangContext";

export default function PostListingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<"rent" | "sale">("rent");
  const [propertyType, setPropertyType] = useState<
    "apartment" | "house" | "commercial"
  >("apartment");
  const { t } = useLang();

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-5 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
          {t("listingPublished")}
        </h2>
        <p className="text-gray-500 mb-8">
          {t("listingPublishedHint")}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          {t("postAnother")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          {t("postListing")}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("fillDetails")}
        </p>
      </div>

      {/* Photos */}
      <Section icon={<Camera size={20} />} title={t("photos")}>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors">
            <Camera size={24} className="text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">{t("addPhoto")}</span>
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
      <Section icon={<DollarSign size={20} />} title={t("dealType")}>
        <div className="flex gap-3">
          <ToggleButton
            active={mode === "rent"}
            onClick={() => setMode("rent")}
          >
            {t("forRent")}
          </ToggleButton>
          <ToggleButton
            active={mode === "sale"}
            onClick={() => setMode("sale")}
          >
            {t("forSale")}
          </ToggleButton>
        </div>
      </Section>

      {/* Property type */}
      <Section icon={<Home size={20} />} title={t("propertyType")}>
        <div className="grid grid-cols-3 gap-3">
          {(["apartment", "house", "commercial"] as const).map((type) => (
            <ToggleButton
              key={type}
              active={propertyType === type}
              onClick={() => setPropertyType(type)}
            >
              {t(type)}
            </ToggleButton>
          ))}
        </div>
      </Section>

      {/* Details */}
      <Section icon={<BedDouble size={20} />} title={t("details")}>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label={t("rooms")} placeholder="2" type="number" />
          <FormInput label={t("floor")} placeholder="3/9" />
        </div>
      </Section>

      <Section icon={<Ruler size={20} />} title={t("area")}>
        <FormInput label={t("totalArea")} placeholder="70" type="number" />
      </Section>

      {/* Price */}
      <Section icon={<DollarSign size={20} />} title={t("price")}>
        <FormInput
          label={mode === "rent" ? t("monthlyPrice") : t("salePrice")}
          placeholder={mode === "rent" ? "400" : "85000"}
          type="number"
        />
      </Section>

      {/* Location */}
      <Section icon={<MapPin size={20} />} title={t("location")}>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label={t("city")} placeholder="Душанбе" />
          <FormInput label={t("district")} placeholder="Исмоили Сомонӣ" />
        </div>
        <FormInput label={t("address")} placeholder="Хиёбон, бинои №" />
      </Section>

      {/* Description */}
      <Section icon={<FileText size={20} />} title={t("descriptionLabel")}>
        <textarea
          rows={4}
          placeholder={t("descriptionPlaceholder")}
          className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] bg-[var(--color-surface)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 resize-none transition-all"
        />
      </Section>

      {/* Contact */}
      <Section icon={<Building size={20} />} title={t("contactInfo")}>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label={t("yourName")} placeholder="Фарход" />
          <FormInput label={t("phone")} placeholder="+992 90 123 4567" />
        </div>
      </Section>

      {/* Submit */}
      <button
        type="button"
        onClick={() => setSubmitted(true)}
        className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-semibold text-base hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-blue-500/20"
      >
        {t("publishListing")}
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
        className="w-full border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] bg-[var(--color-surface)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
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
