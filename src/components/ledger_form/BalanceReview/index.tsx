import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useEffect, useMemo, useState } from "react"
import { useWatch } from "react-hook-form"
import { useCoa } from "../../../hooks/coa/useCoa"
import useStepper from "../../../hooks/stepper/useStepper"
import { fetchOutstanding } from "../../ledger_list/FetchUtil"
import type { LedgerEntry } from "../EntryForm/FormUtils"

function createData(
  coa: number,
  name: string,
  balance: number,
  updated: number
) {
  return { coa, name, balance, updated };
}

export default function BalanceReview() {
  const { getAccountName, getBalanceType } = useCoa();
  const { back } = useStepper();
  const [rowData, setRowData] = useState<ReturnType<typeof createData>[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  // Reactively watch ledgerItems; memoize a non-null array for stable deps
  const watchedLedgerItems = useWatch<LedgerEntry, "ledgerItems">({ name: "ledgerItems" });
  const formEntry = useMemo(() => watchedLedgerItems ?? [], [watchedLedgerItems]);

  // Merge data source: new entry amount + existing balances
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const handle = setTimeout(
      async () => {
        try {
          // Unique + sorted COAs to minimize request and ensure stable order
          const listOfCoa = Array.from(new Set(formEntry.map((e) => e.coa)));

          // Await the Promise and type the result explicitly
          const balanceMap: Map<number, number> = await fetchOutstanding(listOfCoa);

          // Build all rows in one pass
          const newRows = formEntry.map((entry) => {
            const { coa, amount, balanceType } = entry;
            const name = getAccountName[coa];
            const balance = balanceMap.get(coa) ?? 0;
            const updated = balanceType === getBalanceType[coa] ? amount : -amount;
            return createData(coa, name, balance, balance + updated);
          });
          setRowData(newRows);
          setLoading(false);

        } catch (err) {
          if (isMounted) setRowData([]);
          console.error("BalanceReview: failed to load balances", err);
        }
      }, 200); // small debounce to avoid network spam while typing

    return () => {
      isMounted = false;
      clearTimeout(handle);
    };
  }, [formEntry, getAccountName, getBalanceType]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Account Name</TableCell>
              <TableCell align="right">Code of Acount</TableCell>
              <TableCell align="right">Previous Balance</TableCell>
              <TableCell align="right">Updated Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableBodySkeleton rows={watchedLedgerItems.length} cols={4}/>
            ) : (
              rowData.map((row: ReturnType<typeof createData>) => (
                <TableRow
                  key={row.coa}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.coa}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                  <TableCell align="right">
                    <Typography color={row.updated >= 0 ? "success" : "error"}>
                      {row.updated}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => back()} variant="contained" sx={{ mt: 2 }}>
        Previous
      </Button>
      <Button
        color="secondary"
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </>
  );
}

export const TableBodySkeleton = ({rows, cols}: {rows:number, cols:number}) => (
    Array.from({ length: rows }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: cols }).map((_, j) => (
        <TableCell key={j}>
          <Skeleton variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ))
)