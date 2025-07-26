import { FormControl, OutlinedInput } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import type { LedgerEntry } from '../../pages/LedgerCreateForm';

interface BalanceTypeHiddenFieldProps {
    register: UseFormRegister<LedgerEntry>;
    balanceType: string;
    insertIndex: number;
}

export default function BalanceTypeHiddenField({ register, balanceType, insertIndex }: BalanceTypeHiddenFieldProps) {

    return <FormControl sx={{ display: 'none' }}>
        <OutlinedInput
            {...register(`ledgerItems.${insertIndex}.type`)}
            sx={{ display: 'none' }}
            id={`input-balance-type-${insertIndex}`}
            defaultValue={`${balanceType}`}
            required
        >
        </OutlinedInput>
    </FormControl>
}