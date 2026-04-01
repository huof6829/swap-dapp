"use client";

import { Link, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

function IconUser({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6 20v-1c0-2.5 2-4.5 6-4.5s6 2 6 4.5v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 11V7a4 4 0 018 0v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGift({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="10" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 10V21M3 14h18" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 10H8.5a2.5 2.5 0 010-5H10a2 2 0 012 2v3zm0 0h3.5a2.5 2.5 0 000-5H14a2 2 0 00-2 2v3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeToggle({
  visible,
  onToggle,
  labelShow,
  labelHide,
}: {
  visible: boolean;
  onToggle: () => void;
  labelShow: string;
  labelHide: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="shrink-0 text-coin-muted transition hover:text-white"
      aria-label={visible ? labelHide : labelShow}
    >
      {visible ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.3 10.3 0 0112 5c6 0 10 7 10 7a18.5 18.5 0 01-5.1 5.1M6.3 6.3A18.5 18.5 0 002 12s4 7 10 7c1.2 0 2.3-.2 3.4-.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

export function LoginView() {
  const t = useTranslations("coinplate");
  const locale = useLocale();
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");

  const [loginPhone, setLoginPhone] = useState("13800138000");
  const [loginPassword, setLoginPassword] = useState("password");
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  const [regPhone, setRegPhone] = useState("13900139000");
  const [regPassword, setRegPassword] = useState("password");
  const [regPassword2, setRegPassword2] = useState("password");
  const [inviteCode, setInviteCode] = useState("CP2024");
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showRegPwd2, setShowRegPwd2] = useState(false);

  const pwdToggleLabels =
    locale === "zh"
      ? { show: "显示密码", hide: "隐藏密码" }
      : { show: "Show password", hide: "Hide password" };

  return (
    <div className="relative min-h-[calc(100vh-2rem)] px-5 pb-8 pt-8">
      <div className="pointer-events-none absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full bg-coin-cyan/20 blur-[70px]" />

      <div className="relative mb-8 flex justify-end">
        <Link
          href="/login"
          locale={locale === "zh" ? "en" : "zh"}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md transition hover:border-coin-cyan/40 hover:shadow-neon"
        >
          <span className="text-coin-cyan" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M3 12h18M12 3a9 9 0 009 9 9 9 0 00-9 9 9 9 0 00-9-9 9 9 0 009-9z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          {locale === "zh" ? "EN" : t("languageZh")}
        </Link>
      </div>

      <div className="relative mb-10 flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-coin-cyan/50 bg-zinc-900/90 text-3xl shadow-neon-strong">
          🏛
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">{t("brand")}</h1>
        <p className="mt-2 text-center text-xs text-coin-muted">{t("tagline")}</p>
      </div>

      <div className="relative mb-8 flex border-b border-white/10">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`relative flex-1 pb-3 text-center text-base font-medium transition ${
            tab === "login" ? "text-coin-cyan" : "text-coin-muted"
          }`}
        >
          {t("login")}
          {tab === "login" && (
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full bg-coin-cyan transition-all duration-300" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`relative flex-1 pb-3 text-center text-base font-medium transition ${
            tab === "register" ? "text-coin-cyan" : "text-coin-muted"
          }`}
        >
          {t("register")}
          {tab === "register" && (
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full bg-coin-cyan transition-all duration-300" />
          )}
        </button>
      </div>

      {tab === "login" ? (
        <div className="relative space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-coin-input px-4 py-3.5 backdrop-blur-sm transition focus-within:border-coin-cyan/40">
            <IconUser className="shrink-0 text-coin-cyan" />
            <input
              type="text"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
              placeholder={t("phonePlaceholder")}
              autoComplete="tel"
            />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-coin-input px-4 py-3.5 backdrop-blur-sm transition focus-within:border-coin-cyan/40">
            <IconLock className="shrink-0 text-coin-cyan" />
            <input
              type={showLoginPwd ? "text" : "password"}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
              placeholder={t("passwordPlaceholder")}
              autoComplete="current-password"
            />
            <EyeToggle
              visible={showLoginPwd}
              onToggle={() => setShowLoginPwd((v) => !v)}
              labelShow={pwdToggleLabels.show}
              labelHide={pwdToggleLabels.hide}
            />
          </div>
          <div className="text-right">
            <button type="button" className="text-sm text-coin-cyan transition hover:underline">
              {t("forgotPassword")}
            </button>
          </div>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-400 py-4 text-base font-semibold text-slate-950 shadow-neon-strong transition hover:scale-[1.01] active:scale-[0.99]"
          >
            {t("loginBtn")}
          </button>
          <p className="pt-6 text-center text-sm text-coin-muted">
            {t("noAccount")}{" "}
            <button
              type="button"
              onClick={() => setTab("register")}
              className="text-coin-cyan transition hover:underline"
            >
              {t("registerNow")}
            </button>
          </p>
        </div>
      ) : (
        <div className="relative space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-coin-input px-4 py-3.5 backdrop-blur-sm transition focus-within:border-coin-cyan/40">
            <IconUser className="shrink-0 text-coin-cyan" />
            <input
              type="text"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
              placeholder={t("phonePlaceholder")}
              autoComplete="tel"
            />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-coin-input px-4 py-3.5 backdrop-blur-sm transition focus-within:border-coin-cyan/40">
            <IconLock className="shrink-0 text-coin-cyan" />
            <input
              type={showRegPwd ? "text" : "password"}
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
              placeholder={t("passwordPlaceholder")}
              autoComplete="new-password"
            />
            <EyeToggle
              visible={showRegPwd}
              onToggle={() => setShowRegPwd((v) => !v)}
              labelShow={pwdToggleLabels.show}
              labelHide={pwdToggleLabels.hide}
            />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-coin-input px-4 py-3.5 backdrop-blur-sm transition focus-within:border-coin-cyan/40">
            <IconLock className="shrink-0 text-coin-cyan" />
            <input
              type={showRegPwd2 ? "text" : "password"}
              value={regPassword2}
              onChange={(e) => setRegPassword2(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
              placeholder={t("confirmPasswordPlaceholder")}
              autoComplete="new-password"
            />
            <EyeToggle
              visible={showRegPwd2}
              onToggle={() => setShowRegPwd2((v) => !v)}
              labelShow={pwdToggleLabels.show}
              labelHide={pwdToggleLabels.hide}
            />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-coin-input px-4 py-3.5 backdrop-blur-sm transition focus-within:border-coin-cyan/40">
            <IconGift className="shrink-0 text-coin-cyan" />
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
              placeholder={t("inviteCodePlaceholder")}
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-400 py-4 text-base font-semibold text-slate-950 shadow-neon-strong transition hover:scale-[1.01] active:scale-[0.99]"
          >
            {t("register")}
          </button>
          <p className="text-center text-xs leading-relaxed text-coin-muted">
            {t("registerAgreementLead")}{" "}
            <button type="button" className="text-coin-cyan transition hover:underline">
              {t("userAgreement")}
            </button>{" "}
            {t("conjunctionAnd")}{" "}
            <button type="button" className="text-coin-cyan transition hover:underline">
              {t("privacyPolicy")}
            </button>
          </p>
          <p className="pt-4 text-center text-sm text-coin-muted">
            {t("hasAccount")}{" "}
            <button
              type="button"
              onClick={() => setTab("login")}
              className="text-coin-cyan transition hover:underline"
            >
              {t("loginNow")}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
