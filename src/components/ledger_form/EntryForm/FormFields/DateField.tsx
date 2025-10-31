import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { LedgerEntry } from "../FormUtils";

export default function DateField() {
  const { control } = useFormContext<LedgerEntry>();

  const currentDate: string = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  return (
    <FormControl >
      <InputLabel htmlFor="date">Date</InputLabel>
      <Controller
        control={control}
        name="date"
        rules={{
          required: { value: true, message: "Date is required" },
          validate: (value: string) => {
            if (!value) return "Date is required";
            // Parse as local midnight to avoid UTC parsing quirks
            const [y, m, d] = value.split("-").map(Number);
            const selected = new Date(y, m - 1, d);
            const today = new Date();
            selected.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return selected.getTime() <= today.getTime() || "Date is Invalid";
          },
        }}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            type="date"
            value={field.value ?? currentDate}
            inputProps={{ max: currentDate }}
          />
        )}
      />
    </FormControl>
  );
}
