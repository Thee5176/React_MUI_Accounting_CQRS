import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { LedgerEntry } from "../../../pages/LedgerEntryForm";

export default function DateField() {
  const { control } = useFormContext<LedgerEntry>();

  // Uncontrolled autofill in react-hook-form means setting a default value via the form's defaultValues prop, not directly in the input.
  // Example:
  const currentDate: string = new Date().toISOString().substring(0, 10);

  return (
    <FormControl sx={{ py: 3 }}>
      <InputLabel htmlFor="date">Date</InputLabel>
      <Controller
        control={control}
        name="date"
        rules={{
          required: { value: true, message: "Date is required" },
          validate: (value: string) => {
            const date = new Date(value);
            return date.getTime() < new Date().getTime() || "Invalid date";
          },
        }}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            type="date"
            value={field.value ?? currentDate}
          />
        )}
      />
    </FormControl>
  );
}
