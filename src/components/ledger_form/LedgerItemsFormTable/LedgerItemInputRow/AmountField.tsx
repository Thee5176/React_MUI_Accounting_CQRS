import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Controller, useFormContext } from 'react-hook-form';
import type { LedgerEntry } from '../../../../pages/LedgerEntryForm';
import type { controlIndexProps } from './index';

export default function AmountField({insertIndex}: controlIndexProps) {
    const {control} = useFormContext<LedgerEntry>();
    
    return (
        <FormControl sx={{py:3}}>
            <Controller 
                control={control}
                name={`ledgerItems.${insertIndex}.amount`}
                rules={{
                    required: { value: true, message: 'Amount is required' },
                    min: { value: 1, message: 'Amount must be at least 1' },
                }}
                render={({ field }) => (
                    <OutlinedInput
                        {...field}
                        type="number"
                        autoComplete="amount"
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                )}
            />
        </FormControl>
    );
}