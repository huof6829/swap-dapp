"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface CoinplateSubpageHeaderProps {
  title: string;
}

export function CoinplateSubpageHeader({ title }: CoinplateSubpageHeaderProps) {
  const router = useRouter();
  const t = useTranslations("coinplate");

  return (
    <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center border-b border-white/10 bg-slate-950/80 px-2 backdrop-blur-xl">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex h-10 w-10 shrink-0 items-center justify-center text-white transition hover:text-coin-cyan"
        aria-label={t("newsBack")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="flex-1 pr-10 text-center text-sm font-medium text-white">{title}</h1>
    </header>
  );
}
