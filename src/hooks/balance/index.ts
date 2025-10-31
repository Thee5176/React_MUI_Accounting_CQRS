import { useMemo } from "react";
import type { LedgerItem } from "../../components/ledger_form/EntryForm/FormUtils";

export type BalanceCheck = {
  debitTotal: number;
  creditTotal: number;
  diff: number;
  isBalanced: boolean;
};

export default function checkBalance(
  items: readonly LedgerItem[] | undefined
): BalanceCheck {
  const safeItems = items ?? [];

  const debit = safeItems
    .filter((item) => item.balanceType === "Debit")
    .reduce((acc, item) => acc + (item.amount || 0), 0);

  const credit = safeItems
    .filter((item) => item.balanceType === "Credit")
    .reduce((acc, item) => acc + (item.amount || 0), 0);

  const diff = debit - credit;

  return {
    debitTotal: debit,
    creditTotal: credit,
    diff,
    isBalanced: diff === 0,
  };
}

export function useProvideBalance(
  items: readonly LedgerItem[] | undefined
): BalanceCheck {
  return useMemo(() => checkBalance(items), [items]);
}