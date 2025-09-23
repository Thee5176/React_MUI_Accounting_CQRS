import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

export default function SetUserNameField() {
    const { control } = useFormContext();
    return (
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="User Name" variant="outlined" />
        )}
      />
    );
}