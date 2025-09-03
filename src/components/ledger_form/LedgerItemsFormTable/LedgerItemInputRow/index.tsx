import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { LedgerEntry } from "../../../../pages/LedgerEntryForm";
import ErrorAlert from "../../ErrorAlert";
import AmountField from "./AmountField";
import BalanceTypeHiddenField from "./BalanceTypeField";
import CoaField from "./CoaField";

export default function LedgerItemInputRow({
  balanceType,
}: {
  balanceType: string;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<LedgerEntry>();

  // useFieldArray to manage dynamic ledgerItems
  const { 
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "ledgerItems",
  });

  // Add new row with unique index
  const insertLedgerItemForm = () => {
    append({ coa: "", amount:0, balanceType:"Debit"});
  };

  return (
    <>
      {fields.map((field, index) => (
        <TableRow key={field.id}>
          <TableCell>
            <Button
              onClick={() => {
                remove(index);
              }}
              disabled={fields.length === 1}
            >
              <RemoveCircleOutlineIcon color="error" />
            </Button>
          </TableCell>
          <TableCell>
            <CoaField insertIndex={index} />
            <ErrorAlert message={errors.ledgerItems?.[index]?.coa?.message} />
          </TableCell>
          <TableCell>
            <AmountField insertIndex={index} />
            <ErrorAlert message={errors.ledgerItems?.[index]?.amount?.message} />
          </TableCell>
          <TableCell>
            <BalanceTypeField
              insertIndex={index}
            />
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell colSpan={5} align="center">
          <Button onClick={insertLedgerItemForm}>
            <AddCircle color="primary"/>
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}