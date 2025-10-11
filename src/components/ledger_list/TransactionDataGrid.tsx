import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColDef, GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useRef, useState } from "react";
import { axiosQueryClient } from "../../service/api";

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
    const [rows, setRows] = useState<GridRowsProp>([]);
    const didFetchRef = useRef(false);

    //define function to fetch data from the server
    const fetchRows = async () => {
        const data = await axiosQueryClient
            .get<LedgerResponse[]>('/api/ledgers/all')
            .then((res) => res?.data ?? null)
            .catch(() => null);
      
        if (data == null) {
          console.warn(
            "ProfitLoss API returned null/invalid payload; rows cleared."
          );
        
      setRows([]);
      return;
    }

        console.log('Before :' ,data);

        // Flatten ledgerItems for each ledger into rows
        const dataRows = data
          .flatMap((ledger, idx) =>
            ledger.ledgerItems.map((item, idy) => {
              const isDebit = item.type == 'Debit';
              const isCredit = item.type == 'Credit';

              return {
                  id: `${idx}-${idy}`,
                  date: ledger.date,
                  coa: item.coa,
                  description: ledger.description,
                  debit: isDebit ? item.amount : 0,
                  credit: isCredit ? item.amount : 0,
                  balance: isDebit ? item.amount : -item.amount,
                  transaction_balance: ledger.ledgerItems.map((entry) => (
                      entry.amount / 2
                  )).reduce((sum, balance) => sum + balance, 0)
                }
            }
            // sort ledgeritem by Code of Account
            ).sort((a,b) => a.coa - b.coa)
        );
        setRows(dataRows);
        
        console.log("After :", dataRows);
    };

    //fetch data on mount
    useEffect(() => {
      if (didFetchRef.current) return;

      didFetchRef.current = true;  
      
      fetchRows()
    })

    return (
      <DataGrid
        sx={{ width: '100%' }}
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
      />
    );
}