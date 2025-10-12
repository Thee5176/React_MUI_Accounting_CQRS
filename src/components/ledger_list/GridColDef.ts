import type { GridColDef } from "@mui/x-data-grid/models";

export const cols: GridColDef[] = [
      {
        field: "date",
        headerName: "Date",
        minWidth: 150,
        flex: 1
    },
      {
        field: "description",
        headerName: "Description",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "coa",
        headerName: "Account",
        minWidth: 150,
        sortable: false,
        flex: 1,
      },
      {
        field: "debit",
        headerName: "Debit",
        minWidth: 50,
        valueFormatter: (value: number) =>
          value ? `$ ${value.toFixed(2)}` : ``,
        rowSpanValueGetter: () => null,
        sortable: false,
        flex: 1,
      },
      {
        field: "credit",
        headerName: "Credit",
        minWidth: 50,
        valueFormatter: (value: number) =>
          value ? `$ ${value.toFixed(2)}` : ``,
        rowSpanValueGetter: () => null,
        sortable: false,
        flex: 1,
      },
      {
        field: "balance",
        headerName: "Balance",
        minWidth: 100,
        valueFormatter: (value: number) =>
          value ? `$ ${value.toFixed(2)}` : ``,
        sortable: false,
        flex: 1,
      },
    ];