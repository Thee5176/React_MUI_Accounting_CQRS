import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import type { GridColumnGroupingModel, GridRowsProp } from "@mui/x-data-grid/models";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCoa } from "../../hooks/coa/useCoa";
import { fetchOutstanding, fetchTransactions } from "./FetchUtil";
import { cols } from "./GridColDef";
import type { LedgerGridProps, SubsidiaryProps } from "./type";

export default function LedgerDataGrid({ isSubsidiary } : { isSubsidiary : boolean}) {
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
    const [listOfCoa, setListOfCoa] = useState<number[]>([]);
    const [transactionData, setTransactionData] = useState<GridRowsProp>([]);
    const [outstandingData, setOutstandingData] = useState<Map<number, number>>(new Map());
    const [loading, setLoading] = useState(false);
    
    const { getAccountName } = useCoa();
    const didFetchRef = useRef(false);
    //fetch data on mount
    useEffect(() => {
      if (didFetchRef.current) return;

      didFetchRef.current = true;
      setLoading(true);
      
      (async () => {
        try {
          // fetch GL data and get the associated coa
          const getAssociateCoa = await fetchTransactions(setTransactionData);
          setListOfCoa(getAssociateCoa ?? []);

          // fetch and process SL data
          const data = await fetchOutstanding(listOfCoa);
          console.log("fetchOutstanding Result:", data);
          // Expecting Map<number, number>; ensure state gets a new Map instance
          setOutstandingData(data);
          console.log("outstanding state: ", outstandingData)
        } catch (e) {
          console.error("fetchOutstanding failed", e);
          setOutstandingData(new Map());
        } finally {
          setLoading(false);
        }
      })();
    }) ;

    // Group rows by COA once to avoid repeated O(n*m) filters on every render
    const rowsByCoa = useMemo(() => {
      const m = new Map<number, GridRowsProp>();
      for (const row of transactionData) {
        const key = Number((row as unknown as { coa: number | string }).coa);
        const bucket = m.get(key);
        m.set(key, bucket ? [...bucket, row] : [row]);
      }
      return m;
    }, [transactionData]);

    return (
      <>
        {isSubsidiary ? (
          <SubsidiaryLedgerGrid
            rows={transactionData}
            getAccountName={getAccountName}
            columnGroupingModel={columnGroupingModel}
            loading={loading}
            listOfCoa={listOfCoa}
            outstanding={outstandingData}
            groupedRows={rowsByCoa}
          />
        ) : (
          <GeneralLedgerGrid
            rows={transactionData}
            columnGroupingModel={columnGroupingModel}
            loading={loading}
          />
        )}
      </>
    );
}

function GeneralLedgerGrid({ rows, columnGroupingModel, loading }: LedgerGridProps) {
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

function SubsidiaryLedgerGrid({
  getAccountName,
  columnGroupingModel,
  loading,
  listOfCoa,
  outstanding,
  groupedRows,
}: SubsidiaryProps & {listOfCoa: number[]; outstanding: Map<number,number>; groupedRows: Map<number, GridRowsProp>}) {
  return (
    <Box>
      {listOfCoa.length === 0 ? (
        <Box>
          <Typography
            sx={{ mb: 1 }}
            variant="h5"
          >{`Name: No Data`}</Typography>
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
            <Typography>{`Account Balance: ${outstanding.get(coa) ?? 0}`}</Typography>

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