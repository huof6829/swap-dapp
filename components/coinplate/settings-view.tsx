"use client";

import { COINPLATE_SHELL } from "@/lib/coinplate/shell-classes";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CoinplateSubpageHeader } from "./coinplate-subpage-header";

const APP_VERSION = "1.0.0";
const SUPPORT_URL = "https://example.com/support";
const QUOTE_CURRENCY_STORAGE = "coinplate_quote_currency";
const QUOTE_CURRENCIES = ["USD", "CNY", "EUR", "JPY"] as const;
type QuoteCurrency = (typeof QUOTE_CURRENCIES)[number];

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function isQuoteCurrency(s: string): s is QuoteCurrency {
  return (QUOTE_CURRENCIES as readonly string[]).includes(s);
}

type SettingsRow =
  | { kind: "language"; key: "settingsLanguage"; value: string; icon: "globe" }
  | { kind: "currency"; key: "settingsCurrency"; value: string; icon: "dollar" }
  | { kind: "about"; key: "settingsAbout"; icon: "info" }
  | { kind: "support"; key: "settingsSupport"; icon: "headset"; href: string };

export function SettingsView() {
  const t = useTranslations("coinplate");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [langSheetOpen, setLangSheetOpen] = useState(false);
  const [currencySheetOpen, setCurrencySheetOpen] = useState(false);
  const [aboutSheetOpen, setAboutSheetOpen] = useState(false);
  const [quoteCurrency, setQuoteCurrency] = useState<QuoteCurrency>("USD");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(QUOTE_CURRENCY_STORAGE);
      if (raw && isQuoteCurrency(raw)) {
        setQuoteCurrency(raw);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useBodyScrollLock(langSheetOpen || currencySheetOpen || aboutSheetOpen);

  const rows: SettingsRow[] = [
    { kind: "language", key: "settingsLanguage", value: t("settingsLanguageValue"), icon: "globe" },
    { kind: "currency", key: "settingsCurrency", value: quoteCurrency, icon: "dollar" },
    { kind: "about", key: "settingsAbout", icon: "info" },
    { kind: "support", key: "settingsSupport", icon: "headset", href: SUPPORT_URL },
  ];

  const logout = () => {
    router.push("/login");
  };

  const pickLocale = (next: "zh" | "en") => {
    router.replace(pathname, { locale: next });
    setLangSheetOpen(false);
  };

  const pickCurrency = (code: QuoteCurrency) => {
    setQuoteCurrency(code);
    try {
      localStorage.setItem(QUOTE_CURRENCY_STORAGE, code);
    } catch {
      /* ignore */
    }
    setCurrencySheetOpen(false);
  };

  const renderIcon = (icon: SettingsRow["icon"]) => {
    if (icon === "globe") {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 12h18M12 3a14 14 0 008 9 14 14 0 00-8 9 14 14 0 00-8-9 14 14 0 008-9z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    }
    if (icon === "dollar") {
      return <span className="text-lg font-semibold">$</span>;
    }
    if (icon === "info") {
      return <span className="text-sm font-bold">i</span>;
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 14v1a3 3 0 003 3h1M4 10V9a3 3 0 013-3h1m8 11v1a3 3 0 003 3h1m0-11V9a3 3 0 00-3-3h-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  };

  const renderRowButton = (row: SettingsRow) => {
    if (row.kind === "language") {
      return (
        <button
          type="button"
          onClick={() => setLangSheetOpen(true)}
          className="coin-glass-card flex w-full items-center gap-3 px-3 py-3.5 text-left transition hover:border-cyan-400/25 hover:bg-white/[0.08]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coin-cyan/15 text-coin-cyan">
            {renderIcon(row.icon)}
          </span>
          <span className="flex-1 text-sm text-white">{t(row.key)}</span>
          <span className="text-xs text-white/50">{row.value}</span>
          <span className="text-white/35">›</span>
        </button>
      );
    }
    if (row.kind === "currency") {
      return (
        <button
          type="button"
          onClick={() => setCurrencySheetOpen(true)}
          className="coin-glass-card flex w-full items-center gap-3 px-3 py-3.5 text-left transition hover:border-cyan-400/25 hover:bg-white/[0.08]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coin-cyan/15 text-coin-cyan">
            {renderIcon(row.icon)}
          </span>
          <span className="flex-1 text-sm text-white">{t(row.key)}</span>
          <span className="text-xs text-white/50">{row.value}</span>
          <span className="text-white/35">›</span>
        </button>
      );
    }
    if (row.kind === "about") {
      return (
        <button
          type="button"
          onClick={() => setAboutSheetOpen(true)}
          className="coin-glass-card flex w-full items-center gap-3 px-3 py-3.5 text-left transition hover:border-cyan-400/25 hover:bg-white/[0.08]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coin-cyan/15 text-coin-cyan">
            {renderIcon(row.icon)}
          </span>
          <span className="flex-1 text-sm text-white">{t(row.key)}</span>
          <span className="text-white/35">›</span>
        </button>
      );
    }
    return (
      <a
        href={row.href}
        target="_blank"
        rel="noopener noreferrer"
        className="coin-glass-card flex items-center gap-3 px-3 py-3.5 transition hover:border-cyan-400/25 hover:bg-white/[0.08]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coin-cyan/15 text-coin-cyan">
          {renderIcon(row.icon)}
        </span>
        <span className="flex-1 text-sm text-white">{t(row.key)}</span>
        <span className="text-white/35">›</span>
      </a>
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <CoinplateSubpageHeader title={t("settingsPageTitle")} />

      <div className="flex flex-1 flex-col gap-2 p-4 pb-28">
        <ul className="space-y-1">
          {rows.map((row) => (
            <li key={row.key}>{renderRowButton(row)}</li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-xl border border-red-500/70 bg-transparent py-3.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            {t("logout")}
          </button>
          <p className="mt-4 text-center text-xs text-white/35">{t("versionLabel", { version: APP_VERSION })}</p>
        </div>
      </div>

      {/* 语言选择 bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          langSheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!langSheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            langSheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setLangSheetOpen(false)}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} overflow-hidden rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            langSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-coin-cyan/15 px-4 py-4">
            <h2 className="text-base font-semibold text-white">{t("settingsLanguage")}</h2>
            <button
              type="button"
              onClick={() => setLangSheetOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/45 transition hover:bg-white/10 hover:text-white/80"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="pb-[max(1rem,env(safe-area-inset-bottom))]">
            <li className="border-b border-coin-cyan/15">
              <button
                type="button"
                onClick={() => pickLocale("zh")}
                className={`flex w-full px-4 py-4 text-left text-sm transition hover:bg-white/5 ${
                  locale === "zh" ? "font-medium text-coin-cyan" : "text-white"
                }`}
              >
                {t("localeNameZh")}
              </button>
            </li>
            <li className="border-b border-coin-cyan/15">
              <button
                type="button"
                onClick={() => pickLocale("en")}
                className={`flex w-full px-4 py-4 text-left text-sm transition hover:bg-white/5 ${
                  locale === "en" ? "font-medium text-coin-cyan" : "text-white"
                }`}
              >
                {t("localeNameEn")}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 计价货币 bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          currencySheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!currencySheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            currencySheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setCurrencySheetOpen(false)}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} overflow-hidden rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            currencySheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-coin-cyan/15 px-4 py-4">
            <h2 className="text-base font-semibold text-white">{t("settingsCurrency")}</h2>
            <button
              type="button"
              onClick={() => setCurrencySheetOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/45 transition hover:bg-white/10 hover:text-white/80"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="pb-[max(1rem,env(safe-area-inset-bottom))]">
            {QUOTE_CURRENCIES.map((code) => (
              <li key={code} className="border-b border-coin-cyan/15">
                <button
                  type="button"
                  onClick={() => pickCurrency(code)}
                  className={`flex w-full px-4 py-4 text-left text-sm transition hover:bg-white/5 ${
                    quoteCurrency === code ? "font-medium text-coin-cyan" : "text-white"
                  }`}
                >
                  {code}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 关于我们 bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          aboutSheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!aboutSheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            aboutSheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setAboutSheetOpen(false)}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} max-h-[min(70vh,480px)] overflow-hidden rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            aboutSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-coin-cyan/15 px-4 py-4">
            <h2 className="text-base font-semibold text-white">{t("settingsAbout")}</h2>
            <button
              type="button"
              onClick={() => setAboutSheetOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white/80"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="max-h-[min(56vh,380px)] overflow-y-auto px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <p className="text-sm leading-relaxed text-slate-400">{t("aboutUsBody")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
