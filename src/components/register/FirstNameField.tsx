import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

export default function FirstNameField() {
    const { control } = useFormContext();
    return (
        <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
                <TextField {...field} label="First Name" variant="outlined" />
            )}
        />
    );
};