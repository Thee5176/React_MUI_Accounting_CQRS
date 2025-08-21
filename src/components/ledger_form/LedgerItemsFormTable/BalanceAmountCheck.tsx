import { TableCell, TableRow, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { LedgerEntry } from "../../../pages/LedgerEntryForm";

export default function BalanceCheckRow({ balanceType }: { balanceType: string }) {
  const { getValues } = useFormContext<LedgerEntry>();

  // calculate total row count based on balance types
  const calculateBalance: (type: string) => number = (type: string) => {
    const ledgerItems = getValues("ledgerItems") || [];
    return ledgerItems
      .filter((item) => item.balanceType === type)
      .reduce((acc, item) => acc + (item.amount || 0), 0);
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={1} sx={{ textAlign: "center" }}>
          <Typography variant="h6">Total {balanceType}</Typography>
        </TableCell>
        <TableCell colSpan={2} sx={{ textAlign: "end" }}>
          <Typography variant="h6">
            ${" "}
            <span id={`total-${balanceType.toLowerCase()}`}>
              {calculateBalance(balanceType)}
            </span>
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
}