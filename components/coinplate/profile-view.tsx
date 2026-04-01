"use client";

import { Link } from "@/i18n/routing";
import { walletsInteractionEnabled } from "@/wagmi.config";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";
import { useState } from "react";

const MENU = [
  { key: "identity" as const, icon: "🛡", href: "/identity" as const },
  { key: "txHistory" as const, icon: "📄", href: "/records" as const },
  { key: "security" as const, icon: "🔒", href: "/security" as const },
  { key: "shareFriends" as const, icon: "👥", href: "/referral" as const },
  { key: "settings" as const, icon: "⚙", href: "/settings" as const },
];

export function ProfileView() {
  const t = useTranslations("coinplate");
  const [hidden, setHidden] = useState(false);

  return (
    <div className="px-4 pb-4 pt-4">
      <header className="mb-5 flex items-start gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-coin-cyan/40 bg-coin-cyan/10 text-2xl text-coin-cyan shadow-neon">
          👤
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-semibold text-white">{t("username")}</p>
            {walletsInteractionEnabled ? (
              <div className="[&_button]:!h-8 [&_button]:!min-w-0 [&_button]:!rounded-lg [&_button]:!bg-coin-cyan/15 [&_button]:!px-2 [&_button]:!text-xs [&_button]:!text-coin-cyan">
                <ConnectButton showBalance={false} chainStatus="none" />
              </div>
            ) : null}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-2 py-0.5 text-xs font-medium text-slate-950">
              VIP2
            </span>
            <span className="rounded-full border border-coin-cyan/50 px-2 py-0.5 text-xs text-coin-cyan">
              {t("verified")}
            </span>
          </div>
        </div>
      </header>

      <section className="trade-glass relative mb-6 overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-600/10" />
        <div className="relative flex items-start justify-between">
          <p className="text-sm text-coin-muted">{t("totalAssets")}</p>
          <button
            type="button"
            onClick={() => setHidden((v) => !v)}
            className="text-coin-muted transition hover:text-coin-cyan"
            aria-label="toggle balance"
          >
            {hidden ? "🙈" : "👁"}
          </button>
        </div>
        <p
          className={`relative mt-2 font-display text-4xl tracking-tight text-white text-glow-cyan transition-all duration-300 ${
            hidden ? "blur-md select-none" : ""
          }`}
        >
          {hidden ? "••••••" : "25,900.50"}
        </p>
        <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
          <div>
            <p className="text-xs text-coin-muted">{t("spotAccount")}</p>
            <p className="mt-1 font-mono text-sm text-white">{hidden ? "****" : "5,200.00"}</p>
          </div>
          <div>
            <p className="text-xs text-coin-muted">{t("futuresAccount")}</p>
            <p className="mt-1 font-mono text-sm text-white">{hidden ? "****" : "12,500.00"}</p>
          </div>
          <div>
            <p className="text-xs text-coin-muted">{t("optionsAccount")}</p>
            <p className="mt-1 font-mono text-sm text-white">{hidden ? "****" : "8,200.50"}</p>
          </div>
        </div>
        <div className="relative mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/deposit"
            className="coin-btn-primary flex items-center justify-center gap-2 text-sm font-semibold shadow-neon transition hover:scale-[1.02] active:scale-95"
          >
            + {t("depositBtn")}
          </Link>
          <Link
            href="/withdraw"
            className="flex items-center justify-center gap-2 rounded-xl border border-coin-cyan/60 bg-transparent py-3 text-sm font-semibold text-coin-cyan backdrop-blur-sm transition hover:bg-coin-cyan/10 active:scale-95"
          >
            ↑ {t("withdraw")}
          </Link>
        </div>
      </section>

      <ul className="space-y-1">
        {MENU.map((m) => (
          <li key={m.key}>
            <Link
              href={m.href}
              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-4 transition hover:border-cyan-400/20 hover:bg-white/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-coin-cyan backdrop-blur-md">
                {m.icon}
              </span>
              <span className="flex-1 text-sm text-white">{t(m.key)}</span>
              <span className="text-coin-muted">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
