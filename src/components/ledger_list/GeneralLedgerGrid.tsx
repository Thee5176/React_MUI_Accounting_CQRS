import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { cols } from "./GridColDef";
import type { LedgerGridProps } from "./type";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteLedgerEntry } from "../ledger_form/EntryForm/FormUtils";
import type { GridColDef } from "@mui/x-data-grid/models";
import { useAuth0 } from "@auth0/auth0-react";

export default function GeneralLedgerGrid({
  rows,
  columnGroupingModel,
  loading,
}: LedgerGridProps) {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const getCacheKey = () => (user?.sub ? `myFormState_${user.sub}` : "myFormState");

  const handleEdit = (ledgerId: string) => {
    // Find the ledger data from rows. Since rows are flattened, we need the original ledger structure.
    // However, for simplicity in this implementation, we can pass the ledgerId and let the form fetch it,
    // OR we can reconstruct it from the flattened rows that share the same ledgerId.

    // For now, let's find all rows with this ledgerId
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

    // Save to localStorage so MultiStepForm can pick it up
    localStorage.setItem(getCacheKey(), JSON.stringify(ledgerData));
    navigate("/form");
  };

  const handleDelete = async (ledgerId: string) => {
    if (window.confirm("Are you sure you want to delete this ledger entry?")) {
      try {
        await deleteLedgerEntry(ledgerId);

        // Clear cache if we are deleting the item being edited
        const cacheKey = getCacheKey();
        const savedData = localStorage.getItem(cacheKey);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed.id === ledgerId) {
            localStorage.removeItem(cacheKey);
          }
        }

        window.location.reload(); // Simple way to refresh data for now
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
    <Box sx={{ display: "flex", flexDirection: "column", my: 3 }}>
      <DataGrid
        rows={rows}
        columns={columnsWithActions}
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
