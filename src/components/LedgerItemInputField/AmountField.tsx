import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { RegisterIndexProps } from './index';

export default function AmountField({register, insertIndex}: RegisterIndexProps) {
    return (
        <FormControl sx={{ py: 3 }}>
            <OutlinedInput
                {...register(`ledgerItems.${insertIndex}.amount`, {
                    valueAsNumber: true,
                })}
                id={`input-amount-${insertIndex}`}
                name="amount"
                type="number"
                placeholder="0.00"
                autoComplete="amount"
                required
            />
        </FormControl>
    );
}