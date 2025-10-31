import { useMemo } from "react";
import type { LedgerItem } from "../../components/ledger_form/EntryForm/FormUtils";

export type OutstandingReport = {
  debitTotal: number;
  creditTotal: number;
};

export interface AccountOutstanding {
  code: number;
  debit: string;
  credit: string;
}

export default function reportOutstanding(
  items: readonly LedgerItem[] | undefined
): OutstandingReport {
  //Calculate Account Outstanding from transaction data
  const safeItems = items ?? [];

  const debit = safeItems
    .filter((item) => item.balanceType === "Debit")
    .reduce((acc, item) => acc + (item.amount || 0), 0);

  const credit = safeItems
    .filter((item) => item.balanceType === "Credit")
    .reduce((acc, item) => acc + (item.amount || 0), 0);

  // return dictionary that take coa as param return the credit, debit for the coa

  return {
    debitTotal: debit,
    creditTotal: credit,
  };
}

export function useProvideOutstanding(
  items: readonly LedgerItem[] | undefined
): OutstandingReport {
  return useMemo(() => reportOutstanding(items), [items]);
}