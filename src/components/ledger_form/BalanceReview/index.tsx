import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useCoa } from "../../../hooks/coa/useCoa"
import useStepper from "../../../hooks/stepper/useStepper"
import type { LedgerItem } from "../EntryForm/FormUtils"

function createData(
  coa: number,
  name: string,
  balance: number,
  updated: number
) {
  return { coa, name, balance, updated };
}

export default function BalanceReview() {
  
  const { getValues } = useFormContext();
  const { getAccountName, getBalanceType } = useCoa();
  const { back } = useStepper();
  
  const [rowData, setRowData] = useState<ReturnType<typeof createData>[] | []>([]);

  useEffect(() => {
    // Merge data source: new entry amount + existing (cached) balances
    const formEntry = getValues("ledgerItems");

    // Fix: Use map to create all rows at once instead of forEach
    const newRows = formEntry.map((entry: LedgerItem) => {
      const { coa, amount, balanceType } = entry;

      const name = getAccountName[coa];
      const balance = 0;  // Query the balance by coa
      const updated = balanceType === getBalanceType[coa] ? amount : -amount;
      
      // console.log(getAccountBalance[coa]);
      return createData(coa, name, balance, balance + updated);
    });

    setRowData(newRows);
  }, [getAccountName, getBalanceType, getValues]);

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
            {rowData.map((row: ReturnType<typeof createData>) => (
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
            ))}
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
