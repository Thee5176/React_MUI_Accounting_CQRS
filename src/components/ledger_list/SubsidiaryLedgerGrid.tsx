import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridRowsProp } from "@mui/x-data-grid/models";
import { cols } from "./GridColDef";
import type { SubsidiaryProps } from "./type";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteLedgerEntry } from "../ledger_form/EntryForm/FormUtils";
import type { GridColDef } from "@mui/x-data-grid/models";

export default function SubsidiaryLedgerGrid({
  rows,
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
  const navigate = useNavigate();

  const handleEdit = (ledgerId: string) => {
    const ledgerRows = rows.filter((r: any) => r.ledgerId === ledgerId);
    if (ledgerRows.length === 0) return;

    const firstRow = ledgerRows[0];
    const ledgerData = {
      id: ledgerId,
      date: firstRow.date,
      description: firstRow.description,
      ledgerItems: ledgerRows.map((r: any) => ({
        coa: r.coa,
        amount: r.debit > 0 ? r.debit : r.credit,
        balanceType: r.debit > 0 ? "Debit" : "Credit",
      })),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("myFormState", JSON.stringify(ledgerData));
    navigate("/form");
  };

  const handleDelete = async (ledgerId: string) => {
    if (window.confirm("Are you sure you want to delete this ledger entry?")) {
      try {
        await deleteLedgerEntry(ledgerId);
        window.location.reload();
      } catch (error) {
        alert("Failed to delete ledger entry");
      }
    }
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Box>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(params.row.ledgerId)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDelete(params.row.ledgerId)}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  };

  const columnsWithActions = [...cols, actionColumn];
  return (
    <Box>
      {listOfCoa.length === 0 ? (
        <Box>
          <Typography sx={{ mb: 1 }} variant="h5">{`Name: No Data`}</Typography>
          <Typography>{`Account Balance: 0`}</Typography>

          <DataGrid
            rows={[]}
            columns={columnsWithActions}
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
              columns={columnsWithActions}
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