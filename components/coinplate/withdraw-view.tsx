"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CoinplateSubpageHeader } from "./coinplate-subpage-header";

export function WithdrawView() {
  const t = useTranslations("coinplate");
  const [method, setMethod] = useState<"onchain" | "bank">("onchain");
  const [amount, setAmount] = useState("");
  const [fundPwd, setFundPwd] = useState("");

  const available = "5,200.00";
  const fee = "0.00";
  const received = amount ? "—" : "0.00";
  const progress = 75;

  const fillAll = () => setAmount("5200");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <CoinplateSubpageHeader title={t("withdrawPageTitle")} />

      <div className="flex flex-1 flex-col gap-4 p-4 pb-28">
        <button
          type="button"
          className="coin-glass-card flex w-full items-center justify-between px-4 py-3 text-left text-sm"
        >
          <span className="text-white/60">{t("withdrawSelectAccount")}</span>
          <span className="flex items-center gap-1 font-medium text-white">
            {t("spotAccount")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/40">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        <button
          type="button"
          className="coin-glass-card flex w-full items-center justify-between px-4 py-3 text-left text-sm"
        >
          <span className="text-white/60">{t("selectCurrency")}</span>
          <span className="flex items-center gap-1 font-medium text-white">
            USDT
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/40">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMethod("onchain")}
            className={`coin-pill-tab ${
              method === "onchain" ? "coin-pill-tab-active" : "coin-pill-tab-idle"
            }`}
          >
            {t("withdrawTabOnchain")}
          </button>
          <button
            type="button"
            onClick={() => setMethod("bank")}
            className={`coin-pill-tab ${
              method === "bank" ? "coin-pill-tab-active" : "coin-pill-tab-idle"
            }`}
          >
            {t("withdrawTabBank")}
          </button>
        </div>

        {method === "onchain" ? (
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white"
          >
            <span className="text-white/60">{t("withdrawAddrLabel")}</span>
            <span className="flex min-w-0 items-center gap-1 text-xs text-white/80">
              <span className="truncate">{t("withdrawAddrRow")}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white/40">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="coin-glass-card flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white"
          >
            <span className="shrink-0 text-white/60">{t("withdrawSelectBankCard")}</span>
            <span className="flex min-w-0 items-center gap-1 pl-2 text-xs text-white/90">
              <span className="truncate text-right">{t("withdrawBankCardDisplay")}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white/40">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        )}

        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-white/60">{t("withdrawAmountLabel")}</span>
            <span className="text-white/50">{t("availableBalance", { amount: available })}</span>
          </div>
          <div className="coin-glass-card flex items-center gap-2 px-3 py-2">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t("withdrawAmountPh")}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
            <button
              type="button"
              onClick={fillAll}
              className="shrink-0 text-sm font-medium text-coin-cyan"
            >
              {t("withdrawAll")}
            </button>
          </div>
        </div>

        <div className="coin-glass-card space-y-2 p-4 text-sm">
          <div className="flex justify-between text-white/60">
            <span>{t("feeLabel")}</span>
            <span className="text-white">{fee} USDT</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>{t("receivedLabel")}</span>
            <span className="text-white">{received} USDT</span>
          </div>
        </div>

        <div
          className={
            method === "bank" ? "coin-glass-card p-4" : ""
          }
        >
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-white/60">{t("volumeProgress")}</span>
            <span className="text-coin-cyan">{t("volumeRatio")}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-coin-cyan transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-white/40">{t("volumeHint")}</p>
        </div>

        <div>
          <label className="mb-2 block text-xs text-white/60">{t("fundPassword")}</label>
          <input
            type="password"
            value={fundPwd}
            onChange={(e) => setFundPwd(e.target.value)}
            placeholder={t("fundPasswordPh")}
            className="coin-input-field w-full"
          />
        </div>

        <button type="button" className="coin-btn-primary w-full">
          {t("submitWithdraw")}
        </button>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">{t("withdrawHistory")}</h2>
          <div className="coin-glass-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm text-white">USDT · TRC20</p>
                <p className="mt-1 text-xs text-white/40">2024-01-15 10:00</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">-2,000.00</p>
                <p className="mt-1 text-xs text-coin-cyan">{t("statusSuccess")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
