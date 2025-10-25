import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export function BalanceSheetSummary() {
  return (
    <TableRow>
      <TableCell sx={{ mt: 3 }} colSpan={6}>
        <Typography variant="h5">Summary</Typography>
        <Typography variant="body1">Total Assets: ¥10,000,000</Typography>
        <Typography variant="body1">Total Liabilities: ¥4,000,000</Typography>
        <Typography variant="body1">Total Equity: ¥6,000,000</Typography>
      </TableCell>
    </TableRow>
  );
}

export function ProfitLossSummary({ netProfit }: { netProfit: Readonly<number> }) {
  return (
    <TableRow>
      <TableCell sx={{ mt: 3 }} colSpan={3}>
        <Typography variant="h5">Net Profit</Typography>
      </TableCell>
      <TableCell sx={{ mt: 3 }} colSpan={2}>
        <Typography variant="body1">${netProfit}</Typography>
      </TableCell>
    </TableRow>
  );
}