"use client";

import { COINPLATE_SHELL } from "@/lib/coinplate/shell-classes";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CoinplateSubpageHeader } from "./coinplate-subpage-header";

const WITHDRAW_ADDRS = [
  { network: "TRC20", labelKey: "walletLabelMain" as const, addr: "TXrz1234…opqrst" },
  { network: "ERC20", labelKey: "walletLabelBackup" as const, addr: "0xAbCd…EfGh" },
];

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function digitsOnlyMax6(value: string) {
  return value.replace(/\D/g, "").slice(0, 6);
}

export function SecurityView() {
  const t = useTranslations("coinplate");
  const router = useRouter();
  const [loginPwdSheetOpen, setLoginPwdSheetOpen] = useState(false);
  const [fundPwdSheetOpen, setFundPwdSheetOpen] = useState(false);
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [fundPw, setFundPw] = useState("");
  const [fundPwConfirm, setFundPwConfirm] = useState("");
  const [addAddressSheetOpen, setAddAddressSheetOpen] = useState(false);
  const [withdrawNetwork, setWithdrawNetwork] = useState<"TRC20" | "ERC20">("TRC20");
  const [withdrawAddrInput, setWithdrawAddrInput] = useState("");
  const [withdrawRemark, setWithdrawRemark] = useState("");
  const [addBankSheetOpen, setAddBankSheetOpen] = useState(false);
  const [bankNameInput, setBankNameInput] = useState("");
  const [bankCardNumber, setBankCardNumber] = useState("");
  const [bankCardHolder, setBankCardHolder] = useState("");

  useBodyScrollLock(loginPwdSheetOpen || fundPwdSheetOpen || addAddressSheetOpen || addBankSheetOpen);

  const closeLoginPwdSheet = () => {
    setLoginPwdSheetOpen(false);
  };

  const closeFundPwdSheet = () => {
    setFundPwdSheetOpen(false);
    setFundPw("");
    setFundPwConfirm("");
  };

  const closeAddAddressSheet = () => {
    setAddAddressSheetOpen(false);
    setWithdrawNetwork("TRC20");
    setWithdrawAddrInput("");
    setWithdrawRemark("");
  };

  const closeAddBankSheet = () => {
    setAddBankSheetOpen(false);
    setBankNameInput("");
    setBankCardNumber("");
    setBankCardHolder("");
  };

  const items = [
    {
      titleKey: "securityLoginPassword" as const,
      statusKey: "securityStatusSet" as const,
      actionKey: "securityActionModify" as const,
      icon: "lock" as const,
      onAction: () => setLoginPwdSheetOpen(true),
    },
    {
      titleKey: "securityFundPasswordRow" as const,
      statusKey: "securityStatusNotSet" as const,
      actionKey: "securityActionSet" as const,
      icon: "pin" as const,
      onAction: () => setFundPwdSheetOpen(true),
    },
    {
      titleKey: "securityIdentityRow" as const,
      statusKey: "securityStatusVerified" as const,
      actionKey: "securityActionManage" as const,
      icon: "shield" as const,
      onAction: () => router.push("/identity"),
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <CoinplateSubpageHeader title={t("securityCenterTitle")} />

      <div className="flex flex-1 flex-col gap-6 p-4 pb-28">
        <section className="space-y-3">
          {items.map((row) => (
            <div
              key={row.titleKey}
              className="coin-glass-card flex items-center gap-3 px-3 py-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coin-cyan/15 text-coin-cyan">
                {row.icon === "lock" ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="M8 11V8a4 4 0 018 0v3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : row.icon === "pin" ? (
                  <span className="text-sm font-bold tracking-tight">123</span>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 4L5 8v5c0 4.5 3.2 8.7 7 9.5 3.8-.8 7-5 7-9.5V8l-7-4z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{t(row.titleKey)}</p>
                <p className="mt-0.5 text-xs text-white/45">{t(row.statusKey)}</p>
              </div>
              <button
                type="button"
                onClick={row.onAction}
                className="shrink-0 rounded-full border border-coin-cyan/70 px-3 py-1 text-xs font-medium text-coin-cyan transition hover:bg-coin-cyan/10"
              >
                {t(row.actionKey)}
              </button>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">{t("withdrawAddressesTitle")}</h2>
            <button
              type="button"
              onClick={() => setAddAddressSheetOpen(true)}
              className="text-xs font-medium text-coin-cyan"
            >
              {t("addNewAddress")}
            </button>
          </div>
          <ul className="space-y-2">
            {WITHDRAW_ADDRS.map((a) => (
              <li
                key={a.network}
                className="coin-glass-card px-4 py-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-md bg-coin-cyan/20 px-2 py-0.5 text-[10px] font-semibold text-coin-cyan">
                    {a.network}
                  </span>
                  <span className="text-xs text-white/45">{t(a.labelKey)}</span>
                </div>
                <p className="font-mono text-sm text-white/90">{a.addr}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">{t("bankCardsSection")}</h2>
            <button
              type="button"
              onClick={() => setAddBankSheetOpen(true)}
              className="text-xs font-medium text-coin-cyan"
            >
              {t("addBankCard")}
            </button>
          </div>
          <div className="coin-glass-card px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-white">{t("bankDepositNameValue")}</span>
              <span className="text-white/80">{t("bankCardHolderName")}</span>
            </div>
            <p className="font-mono text-sm text-white">**** **** **** 1234</p>
          </div>
        </section>
      </div>

      {/* 修改登录密码 bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          loginPwdSheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!loginPwdSheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            loginPwdSheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeLoginPwdSheet}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} max-h-[85vh] overflow-hidden rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            loginPwdSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-center pt-2 pb-1">
            <span className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
          </div>
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-medium text-white">{t("changeLoginPasswordTitle")}</h2>
            <button
              type="button"
              onClick={closeLoginPwdSheet}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="max-h-[min(70vh,560px)] overflow-y-auto px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("changeLoginOldPw")}</label>
                <input
                  type="password"
                  value={oldPw}
                  onChange={(e) => setOldPw(e.target.value)}
                  placeholder={t("changeLoginOldPwPh")}
                  autoComplete="current-password"
                  className="coin-input-field w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("changeLoginNewPw")}</label>
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder={t("changeLoginNewPwPh")}
                  autoComplete="new-password"
                  className="coin-input-field w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("changeLoginConfirmPw")}</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder={t("changeLoginConfirmPwPh")}
                  autoComplete="new-password"
                  className="coin-input-field w-full"
                />
              </div>
            </div>
            <button
              type="button"
              className="coin-btn-primary mt-6 w-full"
            >
              {t("changeLoginSubmit")}
            </button>
          </div>
        </div>
      </div>

      {/* 设置资金密码 bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          fundPwdSheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!fundPwdSheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            fundPwdSheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeFundPwdSheet}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} max-h-[85vh] overflow-hidden rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            fundPwdSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-center pt-2 pb-1">
            <span className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
          </div>
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-medium text-white">{t("setFundPasswordTitle")}</h2>
            <button
              type="button"
              onClick={closeFundPwdSheet}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="max-h-[min(70vh,560px)] overflow-y-auto px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("fundPassword")}</label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="new-password"
                  maxLength={6}
                  value={fundPw}
                  onChange={(e) => setFundPw(digitsOnlyMax6(e.target.value))}
                  placeholder={t("setFundPasswordPh")}
                  className="coin-input-field w-full tracking-widest"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("setFundPasswordConfirmLabel")}</label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="new-password"
                  maxLength={6}
                  value={fundPwConfirm}
                  onChange={(e) => setFundPwConfirm(digitsOnlyMax6(e.target.value))}
                  placeholder={t("setFundPasswordConfirmPh")}
                  className="coin-input-field w-full tracking-widest"
                />
              </div>
            </div>
            <button
              type="button"
              className="coin-btn-primary mt-6 w-full"
            >
              {t("setFundPasswordSubmit")}
            </button>
          </div>
        </div>
      </div>

      {/* 添加提现地址 bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          addAddressSheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!addAddressSheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            addAddressSheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeAddAddressSheet}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} max-h-[85vh] overflow-hidden rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            addAddressSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-center pt-2 pb-1">
            <span className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
          </div>
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold text-white">{t("addWithdrawAddressTitle")}</h2>
            <button
              type="button"
              onClick={closeAddAddressSheet}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="max-h-[min(70vh,560px)] overflow-y-auto px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("addWithdrawNetworkLabel")}</label>
                <div className="relative">
                  <select
                    value={withdrawNetwork}
                    onChange={(e) => setWithdrawNetwork(e.target.value as "TRC20" | "ERC20")}
                    className="coin-input-field w-full cursor-pointer appearance-none py-3 pl-4 pr-10"
                  >
                    <option value="TRC20">{t("networkTRC20")}</option>
                    <option value="ERC20">{t("networkERC20")}</option>
                  </select>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("addWithdrawAddressFieldLabel")}</label>
                <input
                  type="text"
                  value={withdrawAddrInput}
                  onChange={(e) => setWithdrawAddrInput(e.target.value)}
                  placeholder={t("addWithdrawAddressPh")}
                  autoComplete="off"
                  className="coin-input-field w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("addWithdrawRemarkLabel")}</label>
                <input
                  type="text"
                  value={withdrawRemark}
                  onChange={(e) => setWithdrawRemark(e.target.value)}
                  placeholder={t("addWithdrawRemarkPh")}
                  autoComplete="off"
                  className="coin-input-field w-full"
                />
              </div>
            </div>
            <button
              type="button"
              className="coin-btn-primary mt-6 w-full"
            >
              {t("addWithdrawSubmit")}
            </button>
          </div>
        </div>
      </div>

      {/* 添加银行卡 bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          addBankSheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!addBankSheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            addBankSheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeAddBankSheet}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} max-h-[85vh] overflow-hidden rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            addBankSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-center pt-2 pb-1">
            <span className="h-1 w-10 rounded-full bg-coin-cyan/40" aria-hidden />
          </div>
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold text-white">{t("addBankCardTitle")}</h2>
            <button
              type="button"
              onClick={closeAddBankSheet}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="max-h-[min(70vh,560px)] overflow-y-auto px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("bankNameLabel")}</label>
                <input
                  type="text"
                  value={bankNameInput}
                  onChange={(e) => setBankNameInput(e.target.value)}
                  placeholder={t("addBankNamePh")}
                  autoComplete="organization"
                  className="coin-input-field w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("addBankCardNumberLabel")}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={bankCardNumber}
                  onChange={(e) => setBankCardNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder={t("addBankCardNumberPh")}
                  autoComplete="off"
                  className="coin-input-field w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-white/60">{t("addBankCardHolderLabel")}</label>
                <input
                  type="text"
                  value={bankCardHolder}
                  onChange={(e) => setBankCardHolder(e.target.value)}
                  placeholder={t("addBankCardHolderPh")}
                  autoComplete="name"
                  className="coin-input-field w-full"
                />
              </div>
            </div>
            <button
              type="button"
              className="coin-btn-primary mt-6 w-full"
            >
              {t("addWithdrawSubmit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
