import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import type { RegisterIndexProps } from './index';

export default function AmountField({register, insertIndex}: RegisterIndexProps) {
    const [inputAmount, setInputAmount] = useState(0.00);
    
    return (
        <FormControl sx={{ py: 3 }}>
            <OutlinedInput
                {...register(`ledgerItems.${insertIndex}.amount`)}
                id={`input-amount-${insertIndex}`}
                type="number"
                autoComplete="amount"
                value={inputAmount}
                onChange={e => setInputAmount(parseFloat(e.target.value))}
                required
            />
        </FormControl>
    );
}