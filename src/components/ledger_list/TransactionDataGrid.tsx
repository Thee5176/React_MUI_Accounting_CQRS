import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useRef, useState } from "react";
import { fetchRows } from "./FetchUtil";
import { cols } from "./GridColDef";

export default function TransactionDataGrid() {
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
    const [loading, setLoading] = useState(false);
    const didFetchRef = useRef(false);

    //fetch data on mount
    useEffect(() => {
      if (didFetchRef.current) return;

      didFetchRef.current = true;  
      fetchRows(setRows, setLoading);
    }, []);

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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