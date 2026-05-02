"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Heart, User } from "lucide-react";

const NAV = [
  { href: "/", label: "Find Homes", icon: Home },
  { href: "/for-you", label: "For You", icon: Compass },
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/profile", label: "My Home", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/listings/")) return null;

  return (
    <nav
      className="fixed left-0 right-0 z-50 bg-black md:hidden"
      style={{
        bottom: 0,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="grid grid-cols-4 h-[64px]">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-[2px]"
            >
              <Icon
                size={22}
                strokeWidth={2}
                className={active ? "text-[#E11C2A]" : "text-white"}
              />
              <span
                className={`text-[11px] font-medium ${
                  active ? "text-[#E11C2A]" : "text-white"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
