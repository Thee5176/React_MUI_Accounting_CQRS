import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

export default function SetLastNameField() {
  const { control } = useFormContext();
  return (
    <Controller
      name="lastname"
      control={control}
      render={({ field }) => (
        <TextField {...field} label="Lastname Name" variant="outlined" />
      )}
    />
  );
}
