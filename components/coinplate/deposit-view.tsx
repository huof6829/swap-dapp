"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { CoinplateSubpageHeader } from "./coinplate-subpage-header";

const MOCK_ADDR_TRC20 = "TXrz1234567890ABCDEFghjklmnopqrst";
const MOCK_ADDR_ERC20 = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

export function DepositView() {
  const t = useTranslations("coinplate");
  const uploadId = useId();
  const [method, setMethod] = useState<"onchain" | "bank">("onchain");
  const [network, setNetwork] = useState<"TRC20" | "ERC20">("TRC20");
  const [copied, setCopied] = useState(false);
  const [bankAmount, setBankAmount] = useState("");

  const address = network === "TRC20" ? MOCK_ADDR_TRC20 : MOCK_ADDR_ERC20;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <CoinplateSubpageHeader title={t("depositPageTitle")} />

      <div className="flex flex-1 flex-col gap-4 p-4 pb-28">
        <button
          type="button"
          className="coin-glass-card flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white"
        >
          <span className="text-white/60">{t("selectCurrency")}</span>
          <span className="flex items-center gap-1 font-medium">
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
            {t("depositTabOnchain")}
          </button>
          <button
            type="button"
            onClick={() => setMethod("bank")}
            className={`coin-pill-tab ${
              method === "bank" ? "coin-pill-tab-active" : "coin-pill-tab-idle"
            }`}
          >
            {t("depositTabBank")}
          </button>
        </div>

        {method === "onchain" ? (
          <>
            <div className="flex gap-2">
              {(["TRC20", "ERC20"] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNetwork(n)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition duration-300 ${
                    network === n
                      ? "border-cyan-400/60 bg-cyan-500/15 text-white shadow-[0_0_16px_rgba(34,211,238,0.18)]"
                      : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                  }`}
                >
                  {n === "TRC20" ? t("networkTRC20") : t("networkERC20")}
                </button>
              ))}
            </div>

            <div className="trade-glass p-4">
              <p className="mb-2 text-center text-xs text-white/50">{t("depositAddrLabel")}</p>
              <p className="mb-4 break-all text-center font-mono text-xs leading-relaxed text-white/90">
                {address}
              </p>
              <button
                type="button"
                onClick={copy}
                className="coin-btn-primary mb-4 flex w-full items-center justify-center gap-2 text-sm font-semibold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                {copied ? t("copied") : t("copyAddress")}
              </button>
              <div className="mx-auto mb-3 flex aspect-square max-w-[180px] items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/40">
                <span className="text-xs text-white/35">QR</span>
              </div>
              <p className="text-center text-xs text-white/50">
                {t("minDepositLead")}
                <span className="text-coin-cyan"> {t("minDepositAmount")}</span>
              </p>
            </div>

            <div className="coin-glass-card flex gap-2 border-coin-cyan/25 bg-coin-cyan/5 p-3 text-xs text-white/70">
              <span className="shrink-0 text-coin-cyan">ⓘ</span>
              <span>{t("depositWarn")}</span>
            </div>
          </>
        ) : (
          <>
            <div className="trade-glass border-cyan-400/20 p-4">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-white/50">{t("bankNameLabel")}</dt>
                  <dd className="text-right font-medium text-white">{t("bankDepositNameValue")}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-white/50">{t("bankHolderLabel")}</dt>
                  <dd className="text-right font-medium text-white">{t("bankDepositHolderValue")}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-white/50">{t("bankAccountLabel")}</dt>
                  <dd className="text-right font-mono text-white">{t("bankDepositAccountMasked")}</dd>
                </div>
              </dl>
            </div>

            <div>
              <label className="mb-2 block text-xs text-white/60">{t("depositAmountLabel")}</label>
              <input
                type="text"
                inputMode="decimal"
                value={bankAmount}
                onChange={(e) => setBankAmount(e.target.value)}
                placeholder={t("depositAmountPh")}
                className="coin-input-field w-full"
              />
            </div>

            <div>
              <p className="mb-2 text-xs text-white/60">{t("uploadProofLabel")}</p>
              <input id={uploadId} type="file" accept="image/*" className="sr-only" />
              <label
                htmlFor={uploadId}
                className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-coin-cyan/50 bg-white/[0.04] px-4 py-6 backdrop-blur-md transition hover:border-cyan-400/70 hover:bg-coin-cyan/10"
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-coin-cyan"
                  aria-hidden
                >
                  <path
                    d="M6.5 19a4.5 4.5 0 01-.36-8.99A5.5 5.5 0 0117.5 9a4 4 0 01.5 7.97V19H6.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V9m0 0l-2.5 2.5M12 9l2.5 2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-center text-xs text-white/50">{t("uploadProofHint")}</span>
              </label>
            </div>

            <button type="button" className="coin-btn-primary w-full">
              {t("submitDeposit")}
            </button>
          </>
        )}

        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">{t("depositHistory")}</h2>
          <div className="coin-glass-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm text-white">USDT · TRC20</p>
                <p className="mt-1 text-xs text-white/40">2024-01-15 14:30</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">+1,000.00</p>
                <p className="mt-1 text-xs text-coin-cyan">{t("statusSuccess")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
