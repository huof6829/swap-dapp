import { ClientWeb3Provider } from "@/components/ClientWeb3Provider";
import { AppShell } from "@/components/coinplate/app-shell";
import { MobileOnlyWall } from "@/components/coinplate/mobile-only-wall";
import { routing } from "@/i18n/routing";
import { isLikelyMobileUserAgent } from "@/lib/mobile-only";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { getMessages, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "zh" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  if (process.env.NODE_ENV === "production") {
    const ua = (await headers()).get("user-agent");
    if (!isLikelyMobileUserAgent(ua)) {
      return <MobileOnlyWall />;
    }
  }

  const messages = await getMessages();

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <ClientWeb3Provider>
        <AppShell>{children}</AppShell>
      </ClientWeb3Provider>
    </LocaleProvider>
  );
}
