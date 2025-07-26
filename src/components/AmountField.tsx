import { FormControl, OutlinedInput } from '@mui/material';
import type { RegisterIndexProps } from '../pages/LedgerCreateForm';

export default function AmountField({register, itemOrder}:RegisterIndexProps) {
    return <FormControl sx={{py:3}}>
        <OutlinedInput
            {...register(`ledgerItems.${itemOrder}.amount`)}
            id={`input-amount-${itemOrder}`}
            name='amount'
            type='number'
            placeholder='0.00'
            autoComplete='amount'
            required
        />
    </FormControl>
}