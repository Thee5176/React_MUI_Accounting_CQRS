import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export function ProfitLossSummary({ netIncome }: { readonly netIncome: number }) {
  return (
    <TableRow>
      <TableCell sx={{ mt: 3 }} colSpan={3}>
        <Typography variant="h5">Net Income</Typography>
      </TableCell>
      <TableCell sx={{ mt: 3 }} colSpan={2}>
        <Typography variant="body1">${netIncome}</Typography>
      </TableCell>
    </TableRow>
  );
}