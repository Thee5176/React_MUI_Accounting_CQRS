import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useRef, useState } from "react";
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
      setLoading(true);
      // fetch GL data

      // fetch and process SL data in background
      (async () => {
        try {
          const listOfCoa = await fetchRows(setRows);

          const data = await fetchOutstanding(listOfCoa as number[]); // Promise result retrieval
          // Expecting Map<number, number>; ensure state gets a new Map instance
          setOutstandingData(new Map(data));
        } catch (e) {
          console.error("fetchOutstanding failed", e);
          setOutstandingData(new Map());
        }
      })();
      setLoading(false);

    }, [setRows, outstandingData]);

    return (
      <>
        {isSubsidiary ? (
          <SubsidiaryLedgerGrid
            rows={rows}
            getAccountName={getAccountName}
            columnGroupingModel={columnGroupingModel}
            loading={loading}
            outstanding={outstandingData}
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

function GeneralLedgerGrid({ rows, columnGroupingModel, loading}: LedgerGridProps) {
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
  rows,
  getAccountName,
  columnGroupingModel,
  loading,
  outstanding,
}: SubsidiaryProps & {outstanding: Map<number,number>}) {
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
          <Typography>{`Account Balance: ${balance.toLocaleString()?? 0}`}</Typography>

          <DataGrid
            rows={rows.filter((row) => Number(row.coa) == coa)}
            columns={cols}
            initialState={{
              columns: {
                columnVisibilityModel: { coa: false },
              },
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
      ))}
    </Box>
  );
}