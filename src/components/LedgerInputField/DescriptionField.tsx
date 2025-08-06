import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import type { LedgerEntry } from "../../pages/LedgerEntryForm";

export default function DescriptionField({ control }: { control: Control<LedgerEntry> }) {
    return (
        <FormControl sx={{py:3}}>
            <InputLabel htmlFor='description'>
                Description
            </InputLabel>
            <Controller 
                control={control}
                name='description'
                rules={{
                    required: { value: true, message: 'Description is required' },
                    minLength: { value: 5, message: 'Description must be at least 5 characters' },
                    maxLength: { value: 50, message: 'Description must be less than 50 characters' },
                }}
                render={({ field }) => (
                    <OutlinedInput
                        {...field}
                        type='text'
                        placeholder='Being <Account1> <verb> From <Account2>'
                        autoComplete='description'
                    /> 
                )}
            />
            {
                
            
            }
        </FormControl>
    );
}