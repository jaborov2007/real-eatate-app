"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, Home } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLang();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center">
              <Home size={22} className="text-white" />
            </div>
            <span className="font-bold text-2xl text-[var(--color-text)]">
              arzon<span className="text-[var(--color-primary)]">.pro</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {isLogin ? t("welcomeBack") : t("createAccount")}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {isLogin ? t("loginHint") : t("registerHint")}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 shadow-sm space-y-5">
          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">
                {t("fullName")}
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Khushbakht"
                  className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] bg-[var(--color-surface)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">
              {t("email")}
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] bg-[var(--color-surface)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">
                {t("phone")}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+992</span>
                <input
                  type="tel"
                  placeholder="90 123 4567"
                  className="w-full pl-16 pr-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] bg-[var(--color-surface)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">
              {t("password")}
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] bg-[var(--color-surface)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] bg-[var(--color-surface)] placeholder-gray-400 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs text-[var(--color-primary)] hover:underline font-medium">
                {t("forgotPassword")}
              </button>
            </div>
          )}

          <button
            type="button"
            className="w-full bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-blue-500/20"
          >
            {isLogin ? t("login") : t("register")}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-text-secondary)]">{t("orContinueWith")}</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span className="text-sm font-medium text-[var(--color-text)]">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text)]"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span className="text-sm font-medium text-[var(--color-text)]">GitHub</span>
            </button>
          </div>
        </div>

        {/* Switch mode */}
        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
          {isLogin ? t("noAccount") : t("haveAccount")}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            {isLogin ? t("register") : t("login")}
          </button>
        </p>
      </div>
    </div>
  );
}
