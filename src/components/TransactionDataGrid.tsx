import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColDef, GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useState } from "react";

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
        { field: 'date', headerName: 'Date', minWidth: 150},
        { field: 'description', headerName: 'Description', minWidth: 150 },
        { 
            field: 'coa', 
            headerName: 'Account', 
            minWidth: 150,
            sortable: false,

        },
        { 
            field: 'debit', 
            headerName: 'Debit', 
            minWidth: 150,
            valueFormatter: (value : number) => (value ? `$ ${value.toFixed(2)}` : ``),
            rowSpanValueGetter: () => null,
            sortable: false,

        },
        { 
            field: 'credit', 
            headerName: 'Credit', 
            minWidth: 150,  
            valueFormatter: (value : number) => (value ? `$ ${value.toFixed(2)}` : ``),
            rowSpanValueGetter: () => null,
            sortable: false,
        },
        { 
            field: 'balance', 
            headerName: 'Balance', 
            minWidth: 150,
            valueFormatter: (value : number) => (value ? `$ ${value.toFixed(2)}` : ``),
            sortable: false,
            
        },
    ];

    const columnGroupingModel : GridColumnGroupingModel = [
        {
            groupId: 'Amount',
            description: '',
            headerAlign: 'center',
            children: [
                { field: 'debit'},
                { field: 'credit'},
            ]
        }
    ] 
    //fetch data with Event hook and put data into row state
    const [rowData, setRowData] = useState<GridRowsProp>([]);

    //define function to fetch data from the server
    const fetchRows = async () => {
        const res = await fetch("http://localhost:8182/api/ledgers/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data: LedgerResponse[] = await res.json();

        // Flatten ledgerItems for each ledger into rows
        const dataRows = data.flatMap((ledger) =>
            ledger.ledgerItems.map((item, idx) => ({
                id: `${ledger.ledgerId}-${idx}`,
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
        ).sort((a,b) => a.coa - b.coa)

    );
    // Sort entries by Date -> Balance Type -> COA -> Balance
        
        setRowData(dataRows);
    };

    //fetch data on mount
    useEffect(() => {
        fetchRows()
    })

    return (
        <Box>
            <DataGrid
            rows={rowData}
            columns={cols}
            initialState={{
                sorting: {
                    sortModel: [
                        { field: 'date', sort: 'desc' },
                    ],
                },
                pagination: {
                    paginationModel: { pageSize: 20, page: 0 }
                }
            }}
            showCellVerticalBorder
            showColumnVerticalBorder
            disableRowSelectionOnClick
            rowSpanning
            columnGroupingModel={columnGroupingModel}
            pageSizeOptions={[20, 50, 100]}
            />
        </Box>
    )
}