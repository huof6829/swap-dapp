import { Link } from "@/i18n/routing";
import type { NewsArticle } from "@/lib/coinplate/mock-data";
import { getTranslations } from "next-intl/server";

interface NewsDetailViewProps {
  article: NewsArticle;
  locale: string;
}

export async function NewsDetailView({ article, locale }: NewsDetailViewProps) {
  const t = await getTranslations({ locale, namespace: "coinplate" });

  return (
    <div className="min-h-screen bg-coin-bg pb-10">
      <header className="sticky top-0 z-20 flex h-12 items-center border-b border-white/10 bg-coin-bg/95 px-3 backdrop-blur-md">
        <Link
          href="/"
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
        </Link>
        <h1 className="flex-1 pr-10 text-center text-sm font-medium text-white">
          {t("newsDetailTitle")}
        </h1>
      </header>

      <div className="flex min-h-[11rem] items-center justify-center bg-[#0a0f0c]">
        <span className="text-5xl font-bold tracking-tight text-coin-cyan sm:text-6xl">
          {article.coin}
        </span>
      </div>

      <div className="px-4 pt-5">
        <h2 className="text-lg font-bold leading-snug text-white">{article.title}</h2>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-coin-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <time dateTime={article.time.replace(" ", "T")}>{article.time}</time>
        </div>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/90">
          {article.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
