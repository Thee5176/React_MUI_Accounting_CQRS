import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { cols } from "./GridColDef";
import type { LedgerGridProps } from "./type";

export default function GeneralLedgerGrid({
  rows,
  columnGroupingModel,
  loading,
}: LedgerGridProps) {
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
