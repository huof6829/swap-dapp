"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { COMMISSION_MOCK, REFERRAL_INVITE_CODE, REFERRAL_INVITE_URL } from "@/lib/coinplate/referral-mock";
import { CoinplateSubpageHeader } from "./coinplate-subpage-header";

export function ReferralView() {
  const t = useTranslations("coinplate");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_INVITE_CODE);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_INVITE_URL);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <CoinplateSubpageHeader title={t("referralTitle")} />

      <div className="flex flex-1 flex-col gap-5 p-4 pb-28">
        <div className="flex flex-col items-center pt-2 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-coin-cyan/50 bg-coin-cyan/10 text-coin-cyan">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M7 18c1-2 3-3 5-3s4 1 5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white">{t("referralHero")}</h2>
          <p className="mt-2 max-w-sm text-sm text-white/50">{t("referralSub")}</p>
        </div>

        <div className="trade-glass p-4">
          <p className="mb-2 text-xs text-white/50">{t("myInviteCode")}</p>
          <p className="mb-4 text-center font-serif text-3xl font-bold tracking-wider text-coin-cyan drop-shadow-[0_0_14px_rgba(34,211,238,0.45)]">
            {REFERRAL_INVITE_CODE}
          </p>
          <button
            type="button"
            onClick={copyCode}
            className="coin-btn-primary mb-6 flex w-full items-center justify-center gap-2 text-sm font-semibold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
              <path
                d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            {copiedCode ? t("copied") : t("copyInviteCode")}
          </button>
          <p className="mb-2 text-xs text-white/50">{t("inviteLinkLabel")}</p>
          <p className="mb-4 break-all font-mono text-xs text-white/60">{REFERRAL_INVITE_URL}</p>
          <button
            type="button"
            onClick={copyLink}
            className="coin-btn-primary flex w-full items-center justify-center gap-2 text-sm font-semibold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
              <path
                d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            {copiedLink ? t("copied") : t("copyInviteLink")}
          </button>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">{t("teamStats")}</h3>
          <div className="trade-glass grid grid-cols-3 divide-x divide-white/10 py-4">
            <div className="px-2 text-center">
              <p className="font-serif text-xl font-bold text-coin-cyan">23</p>
              <p className="mt-1 text-[10px] text-white/45">{t("directInvitesLabel")}</p>
            </div>
            <div className="px-2 text-center">
              <p className="font-serif text-xl font-bold text-coin-cyan">156</p>
              <p className="mt-1 text-[10px] text-white/45">{t("teamSizeLabel")}</p>
            </div>
            <div className="px-2 text-center">
              <p className="font-serif text-xl font-bold text-coin-cyan">3,580.50</p>
              <p className="mt-1 text-[10px] text-white/45">{t("cumulativeCommission")}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">{t("commissionRecords")}</h3>
          <ul className="space-y-2">
            {COMMISSION_MOCK.map((row) => (
              <li
                key={`${row.user}-${row.time}`}
                className="coin-glass-card flex items-start justify-between gap-3 p-4"
              >
                <div>
                  <p className="text-sm text-white">{row.user}</p>
                  <p className="mt-1 text-xs text-white/45">{t(row.typeKey)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-coin-cyan">{row.amount}</p>
                  <p className="mt-1 text-xs text-white/40">{row.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
