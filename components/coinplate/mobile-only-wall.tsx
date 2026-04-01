import { getTranslations } from "next-intl/server";

function PhoneIcon() {
  return (
    <svg
      width="40"
      height="64"
      viewBox="0 0 40 64"
      fill="none"
      className="text-coin-cyan"
      aria-hidden
    >
      <rect
        x="4"
        y="2"
        width="32"
        height="60"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <line x1="14" y1="54" x2="26" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export async function MobileOnlyWall() {
  const t = await getTranslations("coinplate");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-coin-bg px-6 py-12 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl border border-coin-cyan/50 bg-coin-cyan/10 shadow-neon">
        <PhoneIcon />
      </div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-white">{t("brand")}</h1>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/90">{t("mobileOnlyBody")}</p>
      <div className="mt-10 w-full max-w-sm rounded-2xl border border-coin-cyan/60 bg-white/5 px-5 py-4 backdrop-blur-sm">
        <p className="text-sm font-medium text-coin-cyan">{t("mobileOnlyHint")}</p>
      </div>
    </div>
  );
}
