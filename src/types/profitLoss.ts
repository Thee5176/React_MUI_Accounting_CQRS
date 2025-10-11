// TypeScript types for ProfitLossStatementDTO response from /api/profit-loss-statement
// Normalized to use an array of objects instead of Record maps

export type BalanceList = {
  code: number;
  balance: number;
};

export interface StatementDTO {
  revenue: BalanceList[];
  expenses: BalanceList[];
}

export interface ProfitLossWithNetIncome extends StatementDTO {
  netIncome: number;
}
