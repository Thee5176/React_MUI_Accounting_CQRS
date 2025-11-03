import type { GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCoa } from "../../hooks/coa/useCoa";
import { fetchOutstanding, fetchTransactions } from "./FetchUtil";
import GeneralLedgerGrid from "./GeneralLedgerGrid";
import SubsidiaryLedgerGrid from "./SubsidiaryLedgerGrid";

const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "Amount",
    description: "",
    headerAlign: "center",
    children: [{ field: "debit" }, { field: "credit" }],
  },
];

export default function LedgerDataGrid({ isSubsidiary } : { isSubsidiary : boolean}) { 
    //fetch data with Event hook and put data into row state
    const [listOfCoa, setListOfCoa] = useState<number[]>([]);
    const [transactionData, setTransactionData] = useState<GridRowsProp>([]);
    const [outstandingData, setOutstandingData] = useState<Map<number, number>>(new Map());
    const [loading, setLoading] = useState(false);
    
    const { getAccountName } = useCoa();
    const didFetchRef = useRef(false);
    //fetch data on mount
    useEffect(() => {
      if (didFetchRef.current) return;

      didFetchRef.current = true;
      setLoading(true);
      
      (async () => {
        try {
          // fetch GL data and get the associated coa
            const coaList = (await fetchTransactions(setTransactionData)) ?? [];
            setListOfCoa(coaList);

          // fetch and process SL data
            const data = await fetchOutstanding(coaList);
          // Expecting Map<number, number>; ensure state gets a new Map instance
          setOutstandingData(data);
        } catch (e) {
          console.error("fetchOutstanding failed", e);
          setOutstandingData(new Map());
        } finally {
          setLoading(false);
        }
      })();
    }, []);

    // Group rows by COA once to avoid repeated O(n*m) filters on every render
    const rowsByCoa = useMemo(() => {
      const m = new Map<number, GridRowsProp>();
      for (const row of transactionData) {
        const key = Number((row as unknown as { coa: number | string }).coa);
        const bucket = m.get(key);
        m.set(key, bucket ? [...bucket, row] : [row]);
      }
      return m;
    }, [transactionData]);

    return (
      <>
        {isSubsidiary ? (
          <SubsidiaryLedgerGrid
            rows={transactionData}
            getAccountName={getAccountName}
            columnGroupingModel={columnGroupingModel}
            loading={loading}
            listOfCoa={listOfCoa}
            outstanding={outstandingData}
            groupedRows={rowsByCoa}
          />
        ) : (
          <GeneralLedgerGrid
            rows={transactionData}
            columnGroupingModel={columnGroupingModel}
            loading={loading}
          />
        )}
      </>
    );
}