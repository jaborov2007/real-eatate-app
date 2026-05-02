import "./globals.css";
import BottomNav from "@/components/BottomNav";
import HeaderWrapper from "@/components/HeaderWrapper";
import Providers from "@/components/Providers";

export const metadata = {
  title: "arzon.pro — Недвижимость в Таджикистане",
  description: "Покупка, продажа и аренда недвижимости в Таджикистане",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <body className="h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <Providers>
          <div className="min-h-full flex flex-col">
            <HeaderWrapper />
            <main className="flex-1 pb-[var(--bottom-nav-height)] md:pb-0">
              {children}
            </main>
          </div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
