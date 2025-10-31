import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export function BalanceSheetSummary({
  debitTotal,
  creditTotal,
}: {
  readonly debitTotal: number;
  readonly creditTotal: number;
}) {
  return (
    <TableRow>
      <TableCell sx={{ mt: 3 }} colSpan={3}>
        <Typography variant="h6" >Balance Summary</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" align="right">{debitTotal.toLocaleString()}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" align="right">{creditTotal.toLocaleString()}</Typography>
      </TableCell>
    </TableRow>
  );
}

export function ProfitLossSummary({ netIncome }: { readonly netIncome: number }) {
  return (
    <TableRow>
      <TableCell sx={{ mt: 3 }} colSpan={4}>
        <Typography variant="h6">Net Profit</Typography>
      </TableCell>
      <TableCell sx={{ mt: 3 }} colSpan={1}>
        <Typography variant="h6">{netIncome.toLocaleString()}</Typography>
      </TableCell>
    </TableRow>
  );
}