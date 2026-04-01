"use client";

import {
  PERIOD_CONTRACT_RATES,
  PERIOD_OPTIONS_RATES,
  PERIODS,
  TIMEFRAMES,
} from "@/lib/coinplate/mock-data";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TradeChart } from "./trade-chart";

function modeFromSearch(modeParam: string | null): "contract" | "options" {
  return modeParam === "options" ? "options" : "contract";
}

function IconActivity({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 12h-4l-3 9L9 3l-3 9H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconTrendUp({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 14l6-6 4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconTrendDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10l6 6 4-4 6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 20h4v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TradeView() {
  const t = useTranslations("coinplate");
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"contract" | "options">(() =>
    modeFromSearch(searchParams.get("mode"))
  );

  useEffect(() => {
    setMode(modeFromSearch(searchParams.get("mode")));
  }, [searchParams]);

  const [tf, setTf] = useState("1m");
  const [periodIdx, setPeriodIdx] = useState(0);
  const [tab, setTab] = useState<"pos" | "hist">("pos");
  const [amount, setAmount] = useState("");
  const [livePrice, setLivePrice] = useState(67432.5);
  const [priceChangePct, setPriceChangePct] = useState(2.35);

  useEffect(() => {
    const id = setInterval(() => {
      setLivePrice((prev) => {
        const delta = (Math.random() - 0.48) * 45;
        const next = prev + delta;
        return Math.round(Math.max(66000, Math.min(69500, next)) * 100) / 100;
      });
      setPriceChangePct((c) => {
        const n = c * 0.92 + (Math.random() - 0.35) * 0.6;
        return Math.round(n * 100) / 100;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const up = priceChangePct >= 0;

  return (
    <div className="px-4 pb-4 pt-3">
      <header className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/10"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-sm font-bold text-black">
            ₿
          </span>
          BTC/USDT
          <span className="text-coin-muted">▾</span>
        </button>
        <div
          className="flex items-center gap-1.5 text-xs font-medium text-cyan-400"
          aria-live="polite"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          Live
        </div>
      </header>

      <div className="trade-glass mb-4 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
            BTC/USD
            <IconClock className="text-slate-500" />
          </div>
          <div className="flex rounded-lg border border-white/10 bg-black/30 p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setMode("contract")}
              className={`rounded-md px-2.5 py-1.5 transition ${
                mode === "contract"
                  ? "bg-cyan-500 font-semibold text-black shadow-lg shadow-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t("contractTab")}
            </button>
            <button
              type="button"
              onClick={() => setMode("options")}
              className={`rounded-md px-2.5 py-1.5 transition ${
                mode === "options"
                  ? "bg-cyan-500 font-semibold text-black shadow-lg shadow-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t("optionsTab")}
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
            ${livePrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div
            className={`mb-1 flex items-center gap-1.5 rounded-lg px-3 py-1.5 ${
              up ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
            }`}
          >
            {up ? <IconTrendUp className="shrink-0" /> : <IconTrendDown className="shrink-0" />}
            <span className="text-lg font-semibold">
              {up ? "+" : ""}
              {priceChangePct.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {TIMEFRAMES.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => setTf(x)}
              className={`shrink-0 rounded-lg px-4 py-1.5 text-xs font-medium transition duration-300 ${
                tf === x
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/40"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <TradeChart />
        </div>
      </div>

      <div className="trade-glass mb-4 grid grid-cols-3 gap-2 p-4 text-center text-xs">
        <div>
          <p className="text-slate-500">{t("high24h")}</p>
          <p className="mt-1 font-mono text-sm font-medium text-white">68,150.00</p>
        </div>
        <div>
          <p className="text-slate-500">{t("low24h")}</p>
          <p className="mt-1 font-mono text-sm font-medium text-white">65,800.00</p>
        </div>
        <div>
          <p className="text-slate-500">{t("vol24h")}</p>
          <p className="mt-1 font-mono text-sm font-medium text-white">1.2B</p>
        </div>
      </div>

      <p className="mb-2 text-sm text-slate-300">{t("selectPeriod")}</p>
      <div className="mb-4 flex w-full gap-2">
        {PERIODS.map((p, i) => {
          const rate =
            mode === "options" ? PERIOD_OPTIONS_RATES[i] : PERIOD_CONTRACT_RATES[i];
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => setPeriodIdx(i)}
              className={`min-w-0 flex-1 rounded-xl border px-1.5 py-2.5 text-center transition duration-300 sm:px-2 ${
                periodIdx === i
                  ? "border-cyan-400/60 bg-cyan-500/15 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <p className="truncate text-xs text-white sm:text-sm">{p.label}</p>
              <p className="mt-1 text-[10px] text-cyan-400 sm:text-xs">{rate}</p>
            </button>
          );
        })}
      </div>

      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-slate-300">{t("amount")}</span>
        <span className="text-slate-500">
          {t("available")}{" "}
          <span className="font-medium text-cyan-400">12,500.00 USDT</span>
        </span>
      </div>
      <div className="mb-4 flex rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-md">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={t("minAmount")}
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
        <span className="text-sm text-slate-500">USDT</span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition duration-300 hover:scale-[1.02] hover:from-emerald-400 hover:to-green-400 hover:shadow-emerald-500/50 active:scale-[0.98]"
        >
          <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
          <span className="relative flex items-center justify-center gap-2">
            <IconTrendUp />
            {t("buyUp")}
          </span>
        </button>
        <button
          type="button"
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-red-600 py-4 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition duration-300 hover:scale-[1.02] hover:from-rose-400 hover:to-red-500 hover:shadow-rose-500/50 active:scale-[0.98]"
        >
          <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
          <span className="relative flex items-center justify-center gap-2">
            <IconTrendDown />
            {t("buyDown")}
          </span>
        </button>
      </div>

      <div className="mb-3 flex border-b border-white/10">
        <button
          type="button"
          onClick={() => setTab("pos")}
          className={`relative flex-1 pb-2 text-sm font-medium transition ${
            tab === "pos" ? "text-cyan-400" : "text-slate-500"
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <IconActivity className="opacity-80" />
            {t("positions")} (2)
          </span>
          {tab === "pos" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("hist")}
          className={`relative flex-1 pb-2 text-sm font-medium transition ${
            tab === "hist" ? "text-cyan-400" : "text-slate-500"
          }`}
        >
          {t("history")}
          {tab === "hist" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
          )}
        </button>
      </div>

      {tab === "pos" && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg transition duration-300 hover:border-cyan-400/25 hover:bg-white/[0.07]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">BTC/USDT</span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                  {t("buyUp")} • 60s
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-slate-500">{t("amount")}</p>
                  <p className="font-mono text-white">500.00</p>
                </div>
                <div>
                  <p className="text-slate-500">{t("openPrice")}</p>
                  <p className="font-mono text-white">67,400.00</p>
                </div>
                <div>
                  <p className="text-slate-500">{t("pnl")}</p>
                  <p className="font-mono text-emerald-400">+16.25</p>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 rounded-lg bg-cyan-500/15 px-2 py-1 font-mono text-xs text-cyan-400">
                ⏱ 45s
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
