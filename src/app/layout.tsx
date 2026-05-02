import Link from "next/link";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { Home, Map, PlusCircle, MessageCircle, User } from "lucide-react";

export const metadata = {
  title: "RealHome — Find Your Perfect Place",
  description: "Buy, sell, and rent properties in Tajikistan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="min-h-full flex flex-col">
          {/* Desktop Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)] hidden md:block">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                  <Home size={18} className="text-white" />
                </div>
                <span className="font-bold text-xl text-[var(--color-text)]">
                  Real<span className="text-[var(--color-primary)]">Home</span>
                </span>
              </Link>

              <nav className="flex items-center gap-1">
                <NavLink href="/" icon={<Home size={18} />}>
                  Home
                </NavLink>
                <NavLink href="/map" icon={<Map size={18} />}>
                  Map
                </NavLink>
                <NavLink href="/post" icon={<PlusCircle size={18} />}>
                  Post Ad
                </NavLink>
                <NavLink href="/messages" icon={<MessageCircle size={18} />}>
                  Messages
                </NavLink>
                <NavLink href="/profile" icon={<User size={18} />}>
                  Profile
                </NavLink>
              </nav>
            </div>
          </header>

          {/* Mobile Header */}
          <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[var(--color-border)] md:hidden">
            <div className="px-4 h-14 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                  <Home size={15} className="text-white" />
                </div>
                <span className="font-bold text-lg">
                  Real<span className="text-[var(--color-primary)]">Home</span>
                </span>
              </Link>
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <User size={18} className="text-gray-600" />
              </Link>
            </div>
          </header>

          <main className="flex-1 pb-[var(--bottom-nav-height)] md:pb-0">
            {children}
          </main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
