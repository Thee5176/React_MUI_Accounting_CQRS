import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useRef, useState } from "react";
import { useCoa } from "../../hooks/coa/useCoa";
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
    const [accounts, setAccounts] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const didFetchRef = useRef(false);
    const { getAccountName } = useCoa();

    //fetch data on mount
    useEffect(() => {
      if (didFetchRef.current) return;

      didFetchRef.current = true;
      setLoading(true);
      fetchRows(setRows, setAccounts);
      setLoading(false);

    }, []);

    return isSubsidiary && accounts.length > 0 ? (
      <SubsidiaryLedgerGrid 
        rows={rows}
        accounts={accounts}
        getAccountName={getAccountName}
        columnGroupingModel={columnGroupingModel}
        loading={loading}
      />
    ) : (
      <GeneralLedgerGrid
        rows={rows}
        columnGroupingModel={columnGroupingModel}
        loading={loading}
      />
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
  )
}

function SubsidiaryLedgerGrid({ rows, accounts, getAccountName, columnGroupingModel, loading }: SubsidiaryProps) {
  accounts = [...new Set(accounts)].sort()

  return (
    <>
      {accounts.map((coa, idx) => (
        <Box
          key={`${coa}-${idx}`}
          sx={{ display: "flex", flexDirection: "column", my: 3 }}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="h5"
          >{`Account: ${getAccountName[coa]} ${coa}`}</Typography>
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
    </>
  );
}