import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCoa } from "../../hooks/coa/useCoa";
import { fetchOutstanding } from "../financial_statement/FetchUtil";
import { fetchRows } from "./FetchUtil";
import { cols } from "./GridColDef";
import type { LedgerGridProps, SubsidiaryProps } from "./type";

export default function LedgerDataGrid({ isSubsidiary } : { isSubsidiary : boolean}) {
    const columnGroupingModel : GridColumnGroupingModel = [
        {
            groupId: 'Amount',
            description: '',
            headerAlign: 'center',
            children: [
                { field: 'debit' },
                { field: 'credit' },
            ]
        }
    ] 
    //fetch data with Event hook and put data into row state
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [outstandingData, setOutstandingData] = useState<Map<number, number>>(
      new Map()
    );
    const [loading, setLoading] = useState(false);
    
    const { getAccountName } = useCoa();
    const didFetchRef = useRef(false);
    //fetch data on mount
    useEffect(() => {
      if (didFetchRef.current) return;

      didFetchRef.current = true;
      let isMounted = true;
      setLoading(true);
      
      (async () => {
        try {
          // fetch GL data and get the associated coa
          const listOfCoaRaw = (await fetchRows(setRows)) as number[];
          // de-duplicate and sort once to minimize payload and server work
          const listOfCoa = Array.from(new Set(listOfCoaRaw)).sort((a, b) => a - b);
          
          // fetch and process SL data
          const data = await fetchOutstanding(listOfCoa);
          if (!isMounted) return;
          // Expecting Map<number, number>; ensure state gets a new Map instance
          setOutstandingData(new Map(data));
        } catch (e) {
          console.error("fetchOutstanding failed", e);
          if (isMounted) setOutstandingData(new Map());
        } finally {
          if (isMounted) setLoading(false);
        }
      })();

      return () => { isMounted = false; };
    }, []);

    // Group rows by COA once to avoid repeated O(n*m) filters on every render
    const rowsByCoa = useMemo(() => {
      const m = new Map<number, GridRowsProp>();
      for (const row of rows) {
        const key = Number((row as unknown as { coa: number | string }).coa);
        const bucket = m.get(key);
        m.set(key, bucket ? [...bucket, row] : [row]);
      }
      return m;
    }, [rows]);

    return (
      <>
        {isSubsidiary ? (
          <SubsidiaryLedgerGrid
            rows={rows}
            getAccountName={getAccountName}
            columnGroupingModel={columnGroupingModel}
            loading={loading}
            outstanding={outstandingData}
            groupedRows={rowsByCoa}
          />
        ) : (
          <GeneralLedgerGrid
            rows={rows}
            columnGroupingModel={columnGroupingModel}
            loading={loading}
          />
        )}
      </>
    );
}

function GeneralLedgerGrid({ rows, columnGroupingModel, loading }: LedgerGridProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", my: 3 }}>
      <DataGrid
        rows={rows}
        columns={cols}
        initialState={{
          columns: {
            columnVisibilityModel: { balance: false },
          },
          // sort ledger by Date
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
          pagination: {
            paginationModel: { pageSize: 20, page: 0 },
          },
        }}
        showCellVerticalBorder
        showColumnVerticalBorder
        disableRowSelectionOnClick
        rowSpanning
        columnGroupingModel={columnGroupingModel}
        pageSizeOptions={[20, 50, 100]}
        loading={loading}
      />
    </Box>
  );
}

function SubsidiaryLedgerGrid({
  getAccountName,
  columnGroupingModel,
  loading,
  outstanding,
  groupedRows,
}: SubsidiaryProps & {outstanding: Map<number,number>; groupedRows: Map<number, GridRowsProp>}) {
  return (
    <Box>
      {Array.from(outstanding.entries()).map(([coa, balance]) => (
        <Box
          key={`${coa}`}
          sx={{
            flexDirection: "column",
            my: 3,
          }}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="h5"
          >{`Name: ${getAccountName[coa]} ${coa}`}</Typography>
          <Typography>{`Account Balance: ${balance.toLocaleString() ?? 0}`}</Typography>

          <DataGrid
            rows={groupedRows.get(coa) ?? []}
            columns={cols}
            initialState={{
              columns: {
                columnVisibilityModel: { coa: false },
              },
              sorting: {
                sortModel: [{ field: "date", sort: "asc" }],
              },
              pagination: {
                paginationModel: { pageSize: 20, page: 0 },
              },
            }}
            showCellVerticalBorder
            showColumnVerticalBorder
            disableRowSelectionOnClick
            rowSpanning
            columnGroupingModel={columnGroupingModel}
            pageSizeOptions={[20, 50, 100]}
            loading={loading}
            hideFooter
          />
        </Box>
      ))}
    </Box>
  );
}