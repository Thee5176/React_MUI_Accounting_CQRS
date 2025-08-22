import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DynamicIndexContext } from "../../../../contexts/DynamicIndexContext";
import type { LedgerEntry } from "../../../../pages/LedgerEntryForm";
import ErrorAlert from "../../ErrorAlert";
import AmountField from "./AmountField";
import BalanceTypeHiddenField from "./BalanceTypeHiddenField";
import CoaField from "./CoaField";

export interface controlIndexProps {
  insertIndex: number;
}

export default function LedgerItemInputRow({
  balanceType,
}: {
  balanceType: string;
}) {
  const {
    formState: { errors, isSubmitSuccessful },
  } = useFormContext<LedgerEntry>();

  const context = useContext(DynamicIndexContext);

  // Use array of indices for dynamic rows
  const [rowIndices, setRowIndices] = useState<number[]>([0]);

  // Add new row with unique index
  const insertLedgerItemForm = () => {
    setRowIndices((prev) => [...prev, prev.length]);
    context?.addRowSpan();
  };

  // Reset to 1 row after submission
  useEffect(() => {
    setRowIndices([0]);
  }, [isSubmitSuccessful]);

  // Calculate adjusted index for each row
  const getAdjustedIndex = (i: number) => {
    // Debit: 0, 2, 4, ... Credit: 1, 3, 5, ...
     return balanceType === "Debit" ? i * 2 : i * 2 + 1;
  };

  return (
    <>
      {rowIndices.map((i) => (
        <TableRow key={`ledgeritems-${getAdjustedIndex(i)}`}>
          <TableCell>
            <CoaField insertIndex={getAdjustedIndex(i)} />
            <ErrorAlert
              message={errors.ledgerItems?.[getAdjustedIndex(i)]?.coa?.message}
            />
          </TableCell>
          <TableCell>
            <AmountField insertIndex={getAdjustedIndex(i)} />
            <ErrorAlert
              message={errors.ledgerItems?.[getAdjustedIndex(i)]?.amount?.message}
            />
          </TableCell>
          <TableCell sx={{ display: "none" }}>
            <BalanceTypeHiddenField
              balanceType={balanceType}
              insertIndex={getAdjustedIndex(i)}
            />
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell colSpan={2} align="center">
          <Button onClick={insertLedgerItemForm}>
            <AddCircle />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
