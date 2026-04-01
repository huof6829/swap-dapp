export type LedgerCategory = "all" | "deposit" | "withdraw" | "transfer" | "swap" | "trade";

export type LedgerTypeKey = "ledgerTypeDeposit" | "ledgerTypeContract" | "ledgerTypeProfit" | "ledgerTypeWithdraw";

export interface LedgerRow {
  id: string;
  category: Exclude<LedgerCategory, "all">;
  typeKey: LedgerTypeKey;
  accountLine: string;
  amount: string;
  /** positive | negative */
  sign: 1 | -1;
  balance: string;
}

export const LEDGER_MOCK: LedgerRow[] = [
  {
    id: "1",
    category: "deposit",
    typeKey: "ledgerTypeDeposit",
    accountLine: "币币 · 2026-03-13 09:45",
    amount: "5,000.00",
    sign: 1,
    balance: "12,500.00",
  },
  {
    id: "2",
    category: "trade",
    typeKey: "ledgerTypeContract",
    accountLine: "合约 · 2026-03-12 16:20",
    amount: "1,200.00",
    sign: -1,
    balance: "7,500.00",
  },
  {
    id: "3",
    category: "trade",
    typeKey: "ledgerTypeProfit",
    accountLine: "合约 · 2026-03-11 10:05",
    amount: "320.50",
    sign: 1,
    balance: "8,700.50",
  },
  {
    id: "4",
    category: "withdraw",
    typeKey: "ledgerTypeWithdraw",
    accountLine: "币币 · 2026-03-10 08:00",
    amount: "800.00",
    sign: -1,
    balance: "8,380.00",
  },
];
