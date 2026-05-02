"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Settings,
  Bell,
  Heart,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Star,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-6 space-y-6">
      {/* User card */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
        <div className="flex items-center gap-4">
          <Image
            src="/images/avatar2.jpg"
            alt="Profile"
            width={72}
            height={72}
            className="rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[var(--color-text)]">
              Khushbakht
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              +992 93 456 7890
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium text-gray-600">
                Member since 2024
              </span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Settings size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard count={2} label="Active Ads" />
        <StatCard count={5} label="Favorites" />
        <StatCard count={3} label="Chats" />
      </div>

      {/* Menu sections */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <MenuLink
          icon={<FileText size={20} />}
          label="My Listings"
          href="/post"
        />
        <MenuLink
          icon={<Heart size={20} />}
          label="Favorites"
          href="/"
        />
        <MenuLink
          icon={<Bell size={20} />}
          label="Notifications"
          href="/messages"
          badge={2}
        />
      </div>

      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <MenuLink
          icon={<Shield size={20} />}
          label="Privacy & Security"
          href="/profile"
        />
        <MenuLink
          icon={<Settings size={20} />}
          label="App Settings"
          href="/profile"
        />
        <MenuLink
          icon={<HelpCircle size={20} />}
          label="Help & Support"
          href="/profile"
        />
      </div>

      <button className="w-full flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
        <LogOut size={20} />
        <span className="font-medium text-sm">Log Out</span>
      </button>

      <p className="text-center text-xs text-gray-400 pb-4">
        RealHome v1.0.0
      </p>
    </div>
  );
}

function StatCard({ count, label }: { count: number; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
      <p className="text-2xl font-bold text-[var(--color-primary)]">{count}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function MenuLink({
  icon,
  label,
  href,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-[var(--color-border)] last:border-b-0"
    >
      <div className="text-[var(--color-primary)]">{icon}</div>
      <span className="flex-1 text-sm font-medium text-[var(--color-text)]">
        {label}
      </span>
      {badge && badge > 0 && (
        <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
      <ChevronRight size={16} className="text-gray-400" />
    </Link>
  );
}
