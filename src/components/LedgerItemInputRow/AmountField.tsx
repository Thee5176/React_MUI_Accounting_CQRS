import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { RegisterIndexProps } from './index';

export default function AmountField({register, insertIndex}: RegisterIndexProps) {
    
    return (
        <FormControl sx={{py:3}}>
            <OutlinedInput
                {...register(`ledgerItems.${insertIndex}.amount`, {
                    required: { value: true, message: 'Amount is required' },
                    min: { value: 1, message: 'Amount must be at least 1' },
                })}
                id={`input-amount-${insertIndex}`}
                type="number"
                autoComplete="amount"
            />
        </FormControl>
    );
}