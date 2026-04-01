"use client";

import { BANNERS, MARKETS, NEWS } from "@/lib/coinplate/mock-data";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function HomeView() {
  const t = useTranslations("coinplate");
  const [bannerIdx, setBannerIdx] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      setBannerIdx((i) => (i + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const subtitleKey = BANNERS[bannerIdx]?.subtitleKey ?? "banner3";
  const subtitle = t(subtitleKey as "banner1" | "banner2" | "banner3");

  return (
    <div className="px-4 pb-4 pt-3">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-white">{t("brand")}</h1>
        <Link
          href="/login"
          className="rounded-lg border border-coin-cyan/40 bg-white/5 px-3 py-1 text-xs text-coin-cyan backdrop-blur-md transition hover:border-cyan-400/60 hover:shadow-neon"
        >
          {t("login")}
        </Link>
      </header>

      <section className="trade-glass relative mb-3 overflow-hidden neon-border-hover">
        <div
          key={bannerIdx}
          className="animate-banner-fade flex min-h-[140px] flex-col items-center justify-center px-4 py-6 text-center"
        >
          <p className="text-sm text-white/50">{BANNERS[bannerIdx]?.title}</p>
          <p className="mt-2 bg-gradient-to-r from-coin-cyan via-sky-300 to-blue-400 bg-clip-text text-lg font-medium text-transparent">
            {subtitle}
          </p>
        </div>
        <div className="flex justify-center gap-2 pb-4">
          {BANNERS.map((_, i) => (
            <button
              key={_.id}
              type="button"
              aria-label={`banner ${i + 1}`}
              onClick={() => setBannerIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === bannerIdx ? "w-6 bg-coin-cyan shadow-neon" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      <button
        type="button"
        className="coin-glass-card mb-5 flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-white/90 transition hover:border-cyan-400/30 hover:bg-white/[0.08]"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center text-coin-cyan" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 10v4M4 10l4-2v8l-4-2M8 8l8-3v14l-8-3M16 5l4 2v10l-4-2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="flex-1 truncate">{t("announcement")}</span>
        <span className="text-white/40">›</span>
      </button>

      <div className="mb-6 grid grid-cols-4 gap-3">
        {[
          { key: "contract", icon: "📈", href: "/trade" as const },
          { key: "options", icon: "📊", href: "/trade?mode=options" as const },
          { key: "deposit", icon: "💳", href: "/deposit" as const },
          { key: "referral", icon: "👥", href: "/referral" as const },
        ].map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="trade-glass flex flex-col items-center gap-2 py-4 transition duration-300 hover:scale-105 hover:border-cyan-400/35 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-center text-xs text-white/90">
              {t(item.key as "contract" | "options" | "deposit" | "referral")}
            </span>
          </Link>
        ))}
      </div>

      <section className="mb-2">
        <h2 className="mb-3 text-base font-semibold text-white">{t("allProducts")}</h2>
        <div className="mb-2 flex border-b border-white/10 pb-2 text-xs text-coin-muted">
          <span className="w-[38%]">{t("name")}</span>
          <span className="w-[32%] text-right">{t("lastPrice")}</span>
          <span className="w-[30%] text-right">{t("change24h")}</span>
        </div>
        <ul className="divide-y divide-white/5">
          {MARKETS.map((m) => (
            <li key={m.pair}>
              <Link
                href="/trade"
                className="flex items-center py-3 transition hover:bg-white/5"
              >
                <div className="flex w-[38%] items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-coin-cyan/35 bg-coin-cyan/10 text-xs font-bold text-coin-cyan">
                    {m.symbol.slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{m.symbol}</p>
                    <p className="truncate text-xs text-coin-muted">{m.pair}</p>
                  </div>
                </div>
                <div className="w-[32%] text-right">
                  <p className="text-sm font-semibold text-white">{m.price}</p>
                  <p className="text-xs text-coin-muted">{m.sub}</p>
                </div>
                <div className="w-[30%] text-right">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      m.changePct >= 0
                        ? "bg-coin-cyan/15 text-coin-cyan"
                        : "bg-coin-red/15 text-coin-red"
                    }`}
                  >
                    {m.changePct >= 0 ? "+" : ""}
                    {m.changePct.toFixed(2)}%
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="py-4 text-center text-xs text-coin-muted">{t("noMore")}</p>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-white">{t("latestNews")}</h2>
        <ul className="space-y-3">
          {NEWS.map((n) => (
            <li key={n.id}>
              <Link
                href={`/news/${n.id}`}
                className="coin-glass-card block p-3 transition duration-200 hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <article className="flex gap-3">
                  <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-xl font-bold tracking-tight text-coin-cyan">
                    {n.coin}
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                      {n.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-coin-muted">
                      {n.summary}
                    </p>
                    <time className="mt-2 block text-xs text-coin-muted/90">{n.time}</time>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
