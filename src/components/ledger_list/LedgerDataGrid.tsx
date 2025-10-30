import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useRef, useState } from "react";
import useProvideCoa from "../../hooks/coa";
import { fetchRows } from "./FetchUtil";
import { cols } from "./GridColDef";

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
    const { coaMap } = useProvideCoa();

    //fetch data on mount
    useEffect(() => {
      if (didFetchRef.current) return;

      didFetchRef.current = true;  
      fetchRows(setRows, setLoading, setAccounts);
      console.log(accounts);

    }, [accounts, rows]);

    return isSubsidiary ? (
      accounts.map((coa) => (
        <Box key={coa} sx={{ display: "flex", flexDirection: "column", my: 3 }}>
          <Typography>{`Account: ${coaMap[coa]} ${coa}`}</Typography>
          <DataGrid
            key={coa}
            rows={rows.filter((row) => Number(row.coa) == coa)}
            columns={cols}
            initialState={{
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
      ))
    ) : (
      <Box sx={{ display: "flex", flexDirection: "column", my: 3 }}>
        <DataGrid
          rows={rows}
          columns={cols}
          initialState={{
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