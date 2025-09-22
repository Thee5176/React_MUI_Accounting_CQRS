import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

export default function SetEmailField() {
  const { control } = useFormContext();
  return (
    <Controller
      name="username"
      control={control}
      render={({ field }) => (
        <TextField {...field} label="Email Address" variant="outlined" />
      )}
    />
  );
}
