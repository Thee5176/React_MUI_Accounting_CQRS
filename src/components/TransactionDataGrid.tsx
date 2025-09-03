import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColDef, GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useRef, useState } from "react";

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

    //define function to fetch data from the server
    const endpoint = useContext(BaseUrlContext);
    const fetchRows = async () => {
        const res = await fetch(`${endpoint.query}/api/ledgers/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data: LedgerResponse[] = await res.json();

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
                transaction_balance: ledger.ledgerItems.map((entry) => (  //TODO refactor o**n pattern!!
                    entry.amount / 2
                )).reduce((curr, balance) => curr + balance, 0),
            })
            // sort ledgeritem by Code of Account
            ).sort((a,b) => a.coa - b.coa)
        );
        setRowData(dataRows);
    };

    //fetch once every render
    const hasFetched = useRef<boolean>(false);

    if (hasFetched) {
      fetchRows()
      console.log(`Transaction Data Last Update : ${Date.now}`)
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