// TypeScript types for ProfitLossStatementDTO response from /api/profit-loss-statement
// Normalized to use an array of objects instead of Record maps

export interface StatementDTO {
  revenue: Map<number, number>;
  expenses: Map<number, number>;
}

export interface ProfitLossWithNetIncome extends StatementDTO {
  netIncome: number;
}
