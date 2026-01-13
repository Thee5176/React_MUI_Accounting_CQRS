import type { ReactNode } from "react";
import { useWatch } from "react-hook-form";
import { useProvideOutstanding } from ".";
import type { LedgerEntry } from "../../components/ledger_form/EntryForm/FormUtils";
import { OutstandingContext } from "./context";

export default function ProvideOutstanding({ children }: { children: ReactNode}) {
  const items = useWatch<LedgerEntry, "ledgerItems">({ name: "ledgerItems" });
  const balance = useProvideOutstanding(items);
  
  return (
    <OutstandingContext.Provider value={balance}>
      {children}
    </OutstandingContext.Provider>
  );
};