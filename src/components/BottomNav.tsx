"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, PlusCircle, MessageCircle, User } from "lucide-react";
import { useLang } from "@/context/LangContext";
import type { TranslationKey } from "@/context/LangContext";

const NAV: { href: string; labelKey: TranslationKey; icon: typeof Home }[] = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/map", labelKey: "map", icon: Map },
  { href: "/post", labelKey: "postAd", icon: PlusCircle },
  { href: "/messages", labelKey: "chat", icon: MessageCircle },
  { href: "/profile", labelKey: "profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLang();

  if (pathname.startsWith("/listings/") || pathname.startsWith("/chat/") || pathname === "/auth")
    return null;

  return (
    <nav
      className="fixed left-0 right-0 bottom-0 z-50 bg-white/90 backdrop-blur-xl border-t border-[var(--color-border)] md:hidden pb-safe"
    >
      <div className="grid grid-cols-5 h-16">
        {NAV.map(({ href, labelKey, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5"
            >
              <div
                className={`flex items-center justify-center w-10 h-7 rounded-full transition-colors ${
                  active ? "bg-[var(--color-primary-light)]" : ""
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={
                    active
                      ? "text-[var(--color-primary)]"
                      : "text-gray-400"
                  }
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-gray-400"
                }`}
              >
                {t(labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
