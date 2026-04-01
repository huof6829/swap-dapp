export interface CommissionRow {
  user: string;
  typeKey: "commissionTypeTrade";
  amount: string;
  time: string;
}

export const REFERRAL_INVITE_CODE = "WS8888";
export const REFERRAL_INVITE_URL = `https://example.com/register?ref=${REFERRAL_INVITE_CODE}`;

export const COMMISSION_MOCK: CommissionRow[] = [
  { user: "User_1234", typeKey: "commissionTypeTrade", amount: "+12.50 USDT", time: "2024-01-15 14:30" },
  { user: "User_5678", typeKey: "commissionTypeTrade", amount: "+8.20 USDT", time: "2024-01-14 11:20" },
];
