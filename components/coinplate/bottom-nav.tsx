"use client";

import { COINPLATE_SHELL } from "@/lib/coinplate/shell-classes";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ACTIVE = "#22d3ee";
const IDLE = "#64748b";

function IconHome({ active }: { active: boolean }) {
  const c = active ? ACTIVE : IDLE;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        stroke={c}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTrade({ active }: { active: boolean }) {
  const c = active ? ACTIVE : IDLE;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 18h4l2-8 4 10 2-6h4"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUser({ active }: { active: boolean }) {
  const c = active ? ACTIVE : IDLE;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke={c} strokeWidth="1.6" />
      <path
        d="M6 20v-1c0-2.5 2-4.5 6-4.5s6 2 6 4.5v1"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BottomNav() {
  const t = useTranslations("coinplate");
  const pathname = usePathname() ?? "/";

  const isHome = pathname === "/" || pathname === "";
  const isTrade = pathname.startsWith("/trade");
  const isProfile = pathname.startsWith("/profile");

  const item = (href: string, active: boolean, label: string, Icon: typeof IconHome) => (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center gap-1 py-2 transition-colors duration-200 ${
        active ? "text-coin-cyan" : "text-coin-muted hover:text-white/80"
      }`}
    >
      <Icon active={active} />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/85 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className={`mx-auto flex ${COINPLATE_SHELL} justify-around px-2 md:rounded-b-3xl`}
      >
        {item("/", isHome, t("home"), IconHome)}
        {item("/trade", isTrade, t("trade"), IconTrade)}
        {item("/profile", isProfile, t("mine"), IconUser)}
      </div>
    </nav>
  );
}
