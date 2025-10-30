import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import useProvideCoa from "../../../hooks/coa"

function createData(
  coa: number,
  // name
  balance: number,
  // trial balance
) {
  return { coa, name, balance };
}

// TODO: useFetch() for  account balance
const rows = [
  createData(1101, 159),
  createData(1201, 237)
];

type BalanceReviewProps = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function BalanceReview({ setActiveStep }: BalanceReviewProps) {
  const { coaMap } = useProvideCoa();

  const entryAmount = 20;

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
            {rows.map((row) => (
              <TableRow
                key={row.coa}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {coaMap[row.coa]}
                </TableCell>
                <TableCell align="right">{row.coa}</TableCell>
                <TableCell align="right">{row.balance}</TableCell>
                <TableCell align="right">{row.balance + entryAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={() => setActiveStep(0)}
        variant="contained"
        sx={{ my: 3 }}
      >
        Previous
      </Button>
      <Button type="submit" variant="contained" sx={{ my: 2 }}>
        Record
      </Button>
    </>
  );
}
