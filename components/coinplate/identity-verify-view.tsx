"use client";

import { COINPLATE_SHELL } from "@/lib/coinplate/shell-classes";
import { KYC_COUNTRY_CODES, type KycCountryCode } from "@/lib/coinplate/kyc-countries";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useState } from "react";
import { CoinplateSubpageHeader } from "./coinplate-subpage-header";

const COUNTRY_MSG_KEY: Record<
  KycCountryCode,
  "kycCountryCN" | "kycCountryUS" | "kycCountryJP" | "kycCountryKR" | "kycCountrySG"
> = {
  CN: "kycCountryCN",
  US: "kycCountryUS",
  JP: "kycCountryJP",
  KR: "kycCountryKR",
  SG: "kycCountrySG",
};

type DocType = "idcard" | "passport" | "license";

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

function CameraUploadBox({
  label,
  inputId,
  hint,
}: {
  label: string;
  inputId: string;
  hint: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs text-white/60">{label}</p>
      <input id={inputId} type="file" accept="image/*" className="sr-only" />
      <label
        htmlFor={inputId}
        className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-coin-cyan/50 bg-white/[0.04] px-4 py-6 backdrop-blur-md transition hover:border-cyan-400/70 hover:bg-coin-cyan/10"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-coin-cyan" aria-hidden>
          <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="11" r="1.8" fill="currentColor" />
          <path d="M4 17l4.5-4.5a1 1 0 011.4 0L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M14 13h3m0 0l-1.5-1.5M17 13l-1.5 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-center text-xs text-white/50">{hint}</span>
      </label>
    </div>
  );
}

export function IdentityVerifyView() {
  const t = useTranslations("coinplate");
  const baseId = useId();

  const [country, setCountry] = useState<KycCountryCode>("CN");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [docType, setDocType] = useState<DocType>("idcard");

  const [realName, setRealName] = useState("");
  const [idNumber, setIdNumber] = useState("");

  useBodyScrollLock(sheetOpen);

  const countryLabel = (code: KycCountryCode) => t(COUNTRY_MSG_KEY[code]);

  const idNumberPh = t(
    docType === "idcard"
      ? "kycIdNumberPhIdCard"
      : docType === "passport"
        ? "kycIdNumberPhPassport"
        : "kycIdNumberPhLicense",
  );

  const pickCountry = useCallback((code: KycCountryCode) => {
    setCountry(code);
    setSheetOpen(false);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <CoinplateSubpageHeader title={t("identityPageTitle")} />

      <div className="flex flex-1 flex-col gap-5 p-4 pb-28">
        <div>
          <p className="mb-2 text-xs text-white/60">{t("kycCountryRegion")}</p>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="coin-glass-card flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white"
          >
            <span>{countryLabel(country)}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/40">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div>
          <p className="mb-2 text-xs text-white/60">{t("kycDocTypeLabel")}</p>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "idcard" as const, key: "kycDocTypeIdCard" as const },
                { id: "passport" as const, key: "kycDocTypePassport" as const },
                { id: "license" as const, key: "kycDocTypeLicense" as const },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDocType(tab.id)}
                className={`coin-pill-tab-sm ${
                  docType === tab.id ? "coin-pill-tab-active" : "coin-pill-tab-idle"
                }`}
              >
                {t(tab.key)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs text-white/60">{t("kycRealName")}</label>
          <input
            type="text"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            placeholder={t("kycRealNamePh")}
            className="coin-input-field w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-white/60">{t("kycIdNumber")}</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder={idNumberPh}
            className="coin-input-field w-full"
          />
        </div>

        {docType === "idcard" ? (
          <div className="space-y-4">
            <CameraUploadBox
              label={t("kycUploadIdFront")}
              inputId={`${baseId}-id-front`}
              hint={t("kycClickUpload")}
            />
            <CameraUploadBox
              label={t("kycUploadIdBack")}
              inputId={`${baseId}-id-back`}
              hint={t("kycClickUpload")}
            />
          </div>
        ) : docType === "passport" ? (
          <CameraUploadBox
            label={t("kycUploadPassportPage")}
            inputId={`${baseId}-passport`}
            hint={t("kycClickUpload")}
          />
        ) : (
          <div className="space-y-4">
            <CameraUploadBox
              label={t("kycUploadLicenseFront")}
              inputId={`${baseId}-lic-front`}
              hint={t("kycClickUpload")}
            />
            <CameraUploadBox
              label={t("kycUploadLicenseBack")}
              inputId={`${baseId}-lic-back`}
              hint={t("kycClickUpload")}
            />
          </div>
        )}

        <button
          type="button"
          className="mt-2 w-full rounded-xl bg-coin-cyan py-3.5 text-sm font-semibold text-white"
        >
          {t("kycSubmitVerify")}
        </button>
      </div>

      {/* Country / region bottom sheet */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-end transition-[visibility] duration-0 ${
          sheetOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!sheetOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            sheetOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSheetOpen(false)}
          aria-label={t("kycCloseSheet")}
        />
        <div
          className={`relative z-[1] mx-auto w-full ${COINPLATE_SHELL} rounded-t-2xl coin-sheet-surface transition-transform duration-300 ease-out ${
            sheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-center pt-2 pb-1">
            <span className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
          </div>
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-medium text-white">{t("kycCountryRegion")}</h2>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label={t("kycCloseSheet")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="max-h-[min(52vh,420px)] overflow-y-auto pb-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {KYC_COUNTRY_CODES.map((code) => (
              <li key={code} className="border-b border-white/10 last:border-0">
                <button
                  type="button"
                  onClick={() => pickCountry(code)}
                  className="flex w-full px-4 py-4 text-left text-sm text-white transition hover:bg-white/5"
                >
                  {countryLabel(code)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
