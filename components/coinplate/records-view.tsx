"use client";

import { LEDGER_MOCK, type LedgerCategory } from "@/lib/coinplate/ledger-mock";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { CoinplateSubpageHeader } from "./coinplate-subpage-header";

const TABS: { id: LedgerCategory; labelKey: string }[] = [
  { id: "all", labelKey: "ledgerTabAll" },
  { id: "deposit", labelKey: "ledgerTabDeposit" },
  { id: "withdraw", labelKey: "ledgerTabWithdraw" },
  { id: "transfer", labelKey: "ledgerTabTransfer" },
  { id: "swap", labelKey: "ledgerTabSwap" },
  { id: "trade", labelKey: "ledgerTabTrade" },
];

export function RecordsView() {
  const t = useTranslations("coinplate");
  const [tab, setTab] = useState<LedgerCategory>("all");

  const rows = useMemo(() => {
    if (tab === "all") return LEDGER_MOCK;
    return LEDGER_MOCK.filter((r) => r.category === tab);
  }, [tab]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <CoinplateSubpageHeader title={t("ledgerPageTitle")} />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-2 py-2">
          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="flex gap-4 px-2">
              {TABS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setTab(x.id)}
                  className={`relative shrink-0 pb-2 text-xs font-medium transition ${
                    tab === x.id ? "text-coin-cyan" : "text-white/45"
                  }`}
                >
                  {t(x.labelKey)}
                  {tab === x.id ? (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-coin-cyan" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-white/80 shadow-lg backdrop-blur-xl transition hover:border-cyan-400/25"
          >
            {t("ledgerAllAccounts")}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/40">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto px-4 pb-28">
          {rows.length === 0 ? (
            <li className="py-12 text-center text-sm text-white/40">{t("ledgerEmpty")}</li>
          ) : (
            rows.map((r) => (
              <li
                key={r.id}
                className="flex items-start justify-between gap-3 border-b border-white/10 py-4 last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{t(r.typeKey)}</p>
                  <p className="mt-1 text-xs text-white/40">{r.accountLine}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p
                    className={`text-sm font-medium ${
                      r.sign > 0 ? "text-coin-cyan" : "text-red-400"
                    }`}
                  >
                    {r.sign > 0 ? "+" : "-"}
                    {r.amount} USDT
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {t("ledgerBalanceAfter", { amount: r.balance })}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
