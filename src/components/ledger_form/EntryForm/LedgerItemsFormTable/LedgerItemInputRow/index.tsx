import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorAlert from "../../ErrorAlert";
import type { LedgerEntry } from "../../FormUtils";
import AmountField from "./AmountField";
import BalanceTypeField from "./BalanceTypeField";
import CoaField from "./CoaField";

export default function LedgerItemInputRow() {
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
    append({ coa: "", amount:0, balanceType:""});
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
              disabled={fields.length <= 2}
            >
              <RemoveCircleOutlineIcon
                color={fields.length <= 2 ? "disabled" : "error"}
              />
            </Button>
          </TableCell>
          <TableCell>
            <CoaField insertIndex={index} />
            <ErrorAlert message={errors.ledgerItems?.[index]?.coa?.message} />
          </TableCell>
          <TableCell>
            <AmountField insertIndex={index} />
            <ErrorAlert
              message={errors.ledgerItems?.[index]?.amount?.message}
            />
          </TableCell>
          <TableCell>
            <BalanceTypeField insertIndex={index} />
              <ErrorAlert message={errors.ledgerItems ? "Double Check the Dr/Cr" : ""}
              />
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell colSpan={4} align="center">
          <Button onClick={insertLedgerItemForm}>
            <AddCircle color="primary" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
