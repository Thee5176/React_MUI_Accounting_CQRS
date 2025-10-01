import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColDef, GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosQueryClient } from "../service/api";

//instance type of LedgerItemsAggregate
interface LedgerItemsAggregate {
    coa: number;
    amount: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}

//instance type of LedgerResponseDTO
export interface LedgerResponse {
    ledgerId: string;
    date: string;
    description: string;
    ledgerItems: LedgerItemsAggregate[];
    createdAt: string;
    updatedAt: string;
}

export default function TransactionDataGrid() {
    const cols: GridColDef[] = [
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
  const [rowData, setRowData] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const fetchingRef = useRef(false);
  const mountedRef = useRef(true);

  //define function to fetch data from the server
  const fetchRows = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (fetchingRef.current) {
      console.log("Already fetching, skipping request");
      return;
    }

    fetchingRef.current = true;

    try {
      if (mountedRef.current) {
        setLoading(true);
        setError(null);
      }
      
      console.log("Making API request to /api/ledgers/all");
      const res = await axiosQueryClient.get('/api/ledgers/all');
      const data: LedgerResponse[] = res.data;

      console.log("Before :", data);

      // Flatten ledgerItems for each ledger into rows
      const dataRows = data.flatMap((ledger, idx) =>
        ledger.ledgerItems.map((item, idy) => ({
          id: `${idx}-${idy}`,
          date: ledger.date,
          coa: item.coa,
          description: ledger.description,
          debit: item.type === 'Debit' ? item.amount : '',
          credit: item.type === 'Credit' ? item.amount : '',
          balance: item.type == 'Debit' ? item.amount : -item.amount,
          transaction_balance: ledger.ledgerItems.map((entry) => (
            entry.amount / 2
          )).reduce((curr, balance) => curr + balance, 0),
        })
        // sort ledgeritem by Code of Account
        ).sort((a,b) => a.coa - b.coa)
      );
      
      console.log("After :", dataRows);
      
      if (mountedRef.current) {
        setRowData(dataRows);
        setHasInitialLoad(true);
      }
    } catch (err: unknown) {
      console.error('Failed to fetch ledger rows', err);
      if (mountedRef.current) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : (err as { response?: { data?: { message?: string }; status?: number } })?.response?.status === 401
          ? "Authentication required. Please login again."
          : (err as { response?: { data?: { message?: string } } })?.response?.data?.message
          || "Failed to load transaction data. Please try again.";
        setError(errorMessage);
      }
    } finally {
      fetchingRef.current = false;
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  //fetch once after the component mounts (ensures interceptors are registered)
  useEffect(() => {
    if (!hasInitialLoad) {
      console.log("Initial data fetch triggered");
      fetchRows();
    }
  }, [fetchRows, hasInitialLoad]);

    if (loading) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 400,
            width: '100%' 
          }}
        >
          <CircularProgress size={60} />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert 
          severity="error" 
          sx={{ width: '100%', mb: 2 }}
          action={
            <button onClick={fetchRows} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>
              Retry
            </button>
          }
        >
          {error}
        </Alert>
      );
    }

    return (
      <DataGrid
        sx={{ width: '100%' }}
        rows={rowData}
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
      />
    );
}