import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export function BalanceSheetSummary() {
  return (
    <TableRow>
      <TableCell sx={{ mt: 3 }} colSpan={3}>
        <Typography variant="body1" >Balance Summary</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" align="right">
          Dr
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" align="right">
          Cr
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export function ProfitLossSummary({ netIncome }: { readonly netIncome: number }) {
  return (
    <TableRow>
      <TableCell sx={{ mt: 3 }} colSpan={4}>
        <Typography variant="h5">Net Income</Typography>
      </TableCell>
      <TableCell sx={{ mt: 3 }} colSpan={1}>
        <Typography variant="body1">${netIncome}</Typography>
      </TableCell>
    </TableRow>
  );
}