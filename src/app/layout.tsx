import Link from "next/link";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Real Estate",
  description: "Local rentals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-white text-gray-900">
        {/* App shell */}
        <div className="min-h-full flex flex-col">
          {/* Header */}
          <header className="border-b">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="font-semibold text-lg">
                Logo
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex gap-6 text-sm">
                <Link href="/" className="hover:text-black">
                  Home
                </Link>
                <Link href="/map" className="hover:text-black">
                  Map
                </Link>
                <Link href="/post" className="hover:text-black">
                  Post
                </Link>
                <Link href="/messages" className="hover:text-black">
                  Messages
                </Link>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 bg-white">{children}</main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
