export const KYC_COUNTRY_CODES = ["CN", "US", "JP", "KR", "SG"] as const;
export type KycCountryCode = (typeof KYC_COUNTRY_CODES)[number];
