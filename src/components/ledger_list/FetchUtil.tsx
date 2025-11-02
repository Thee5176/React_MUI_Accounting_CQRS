import type { GridRowsProp } from "@mui/x-data-grid/models";
import type { Dispatch, SetStateAction } from "react";
import { axiosQueryClient } from "../../service/api";
import type { LedgerResponse } from "./type";

// define function to fetch data from the server
export const fetchTransactions = async (
  setTransactionData: Dispatch<SetStateAction<GridRowsProp>>
) => {
  const data = await axiosQueryClient
    .get<LedgerResponse[]>("/api/ledgers/all")
    .then((res) => res?.data ?? null)
    .catch(() => null);

  // Null Case
  if (data == null) {
    console.warn("API returned null/invalid payload; rows cleared.");
    setTransactionData([]);
    return;
  }

  // console.log("Before Transaform :", data);

  // Collect unique COA codes while flattening rows
  const coaSet = new Set<number>();

  // Flatten ledgerItems for each ledger into rows
  const dataRows = data.flatMap((ledger, idx) =>
    ledger.ledgerItems
      .map(
        (item, idy) => {
          const isDebit = item.type == "Debit";
          const isCredit = item.type == "Credit";

          coaSet.add(item.coa);

          return {
            id: `${idx}-${idy}`,
            date: ledger.date,
            coa: item.coa,
            description: ledger.description,
            debit: isDebit ? item.amount : 0,
            credit: isCredit ? item.amount : 0,
            balance: isDebit ? item.amount : -item.amount,
            // calculate the balance of transaction
            transaction_balance: ledger.ledgerItems
              .map((entry) => entry.amount / 2)
              .reduce((sum, balance) => sum + balance, 0),
          };
        }
        // sort ledgeritem by Code of Account
      )
      .sort((a, b) => b.balance - a.balance)
  );
  // console.log("After Transaform:", dataRows);

  setTransactionData(dataRows);

  return Array.from(coaSet) as number[];
};

export async function fetchOutstanding(listOfCoa: number[]) {
  const data = (
    await axiosQueryClient
      .post("/balance/json", listOfCoa)
      .then((res) => res.data ?? null)
     .catch(() => null)  
    ) as Map<number, number>;

  console.log("fetch param: ", listOfCoa);
  console.log("Account Balance Data: ", data);

  const result = new Map<number, number>();
  for (const coa of listOfCoa) {
    result.set(coa, data.get(coa) ?? 0);
  }

  console.log("Fetch Account Outstanding : ", result);
  return result;
}