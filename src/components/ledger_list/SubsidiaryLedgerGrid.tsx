import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridRowsProp } from "@mui/x-data-grid/models";
import { cols } from "./GridColDef";
import type { SubsidiaryProps } from "./type";

export default function SubsidiaryLedgerGrid({
  getAccountName,
  columnGroupingModel,
  loading,
  listOfCoa,
  outstanding,
  groupedRows,
}: SubsidiaryProps & {
  listOfCoa: number[];
  outstanding: Map<number, number>;
  groupedRows: Map<number, GridRowsProp>;
}) {
  return (
    <Box>
      {listOfCoa.length === 0 ? (
        <Box>
          <Typography sx={{ mb: 1 }} variant="h5">{`Name: No Data`}</Typography>
          <Typography>{`Account Balance: 0`}</Typography>

          <DataGrid
            rows={[]}
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
      ) : (
        listOfCoa.map((coa) => (
          <Box
            key={coa}
            sx={{
              flexDirection: "column",
              my: 3,
            }}
          >
            <Typography
              sx={{ mb: 1 }}
              variant="h5"
            >{`Name: ${getAccountName[coa]} ${coa}`}</Typography>
            <Typography>{`Account Balance: $ ${outstanding.get(coa)?.toLocaleString() ?? 0}`}</Typography>

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
        ))
      )}
    </Box>
  );
}