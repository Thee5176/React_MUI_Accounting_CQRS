import { FormControl, OutlinedInput } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import type { LedgerEntry } from '../pages/LedgerCreateForm';

interface BalanceTypeHiddenFieldProps {
    register: UseFormRegister<LedgerEntry>;
    itemOrder: number;
    balanceType: string;
}

export default function BalanceTypeHiddenField({ register, itemOrder, balanceType }: BalanceTypeHiddenFieldProps) {

    return <FormControl sx={{ display: 'none' }}>
        <OutlinedInput
            {...register(`ledgerItems.${itemOrder}.type`)}
            sx={{ display: 'none' }}
            id={`input-balance-type-${itemOrder}`}
            defaultValue={`${balanceType}`}
            required
        >
        </OutlinedInput>
    </FormControl>
}