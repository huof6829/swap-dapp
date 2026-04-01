import { NewsDetailView } from "@/components/coinplate/news-detail-view";
import { getNewsArticle, NEWS_ARTICLES } from "@/lib/coinplate/mock-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ id: a.id }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const article = getNewsArticle(id);
  if (!article) {
    notFound();
  }
  return <NewsDetailView article={article} locale={locale} />;
}
