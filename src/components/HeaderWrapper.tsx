"use client";

import Link from "next/link";
import { Home, Map, PlusCircle, MessageCircle, User, Moon, Sun, LogIn } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";


export default function HeaderWrapper() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl text-[var(--color-text)]">
              arzon<span className="text-[var(--color-primary)]">.pro</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink href="/" icon={<Home size={18} />}>
              {t("home")}
            </NavLink>
            <NavLink href="/map" icon={<Map size={18} />}>
              {t("map")}
            </NavLink>
            <NavLink href="/post" icon={<PlusCircle size={18} />}>
              {t("postAd")}
            </NavLink>
            <NavLink href="/messages" icon={<MessageCircle size={18} />}>
              {t("messages")}
            </NavLink>
            <NavLink href="/profile" icon={<User size={18} />}>
              {t("profile")}
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
              <LangBtn active={lang === "ru"} onClick={() => setLang("ru")}>
                РУС
              </LangBtn>
              <LangBtn active={lang === "tj"} onClick={() => setLang("tj")}>
                ТАҶ
              </LangBtn>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              title={theme === "light" ? t("darkMode") : t("lightMode")}
            >
              {theme === "light" ? (
                <Moon size={18} className="text-gray-600" />
              ) : (
                <Sun size={18} className="text-amber-400" />
              )}
            </button>

            {/* Login */}
            <Link
              href="/auth"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <LogIn size={16} />
              {t("login")}
            </Link>
          </div>
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
              arzon<span className="text-[var(--color-primary)]">.pro</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5">
            {/* Language switcher mobile */}
            <div className="flex items-center bg-gray-100 rounded-md p-0.5">
              <LangBtn active={lang === "ru"} onClick={() => setLang("ru")} small>
                РУ
              </LangBtn>
              <LangBtn active={lang === "tj"} onClick={() => setLang("tj")} small>
                ТҶ
              </LangBtn>
            </div>

            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              {theme === "light" ? (
                <Moon size={16} className="text-gray-600" />
              ) : (
                <Sun size={16} className="text-amber-400" />
              )}
            </button>

            {/* Profile/Login */}
            <Link
              href="/auth"
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <User size={16} className="text-gray-600" />
            </Link>
          </div>
        </div>
      </header>
    </>
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

function LangBtn({
  active,
  onClick,
  children,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${small ? "px-2 py-1 text-[10px]" : "px-2.5 py-1 text-xs"} rounded-md font-semibold transition-colors ${
        active
          ? "bg-[var(--color-primary)] text-white"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
