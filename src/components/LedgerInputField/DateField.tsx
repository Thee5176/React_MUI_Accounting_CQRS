import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import type { LedgerEntry } from "../../pages/LedgerEntryForm";

export default function DateField({ currentDate, control }:{currentDate: string, control: Control<LedgerEntry>}) {
    return (
        <FormControl sx={{py:3}}>
            <InputLabel htmlFor='date'>
                Date
            </InputLabel>
            <Controller
                control={control}
                name="date"
                defaultValue={currentDate}
                rules={{
                    required: { value: true, message: 'Date is required' },
                    validate: (value:string) => {
                        const date = new Date(value);
                        return (date.getTime() < new Date().getTime()) || 'Invalid date';
                    }
                }}
                render={({ field }) => (
                    <OutlinedInput
                        {...field}
                        type='date'
                        defaultValue={currentDate}
                    />
                )}
            />
        </FormControl>
    )
}