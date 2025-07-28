import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { UseFormRegister } from 'react-hook-form/';
import type { LedgerEntry } from '../../pages/LedgerCreateForm';

interface BalanceTypeHiddenFieldProps {
    register: UseFormRegister<LedgerEntry>;
    balanceType: string;
    insertIndex: number;
}

export default function BalanceTypeHiddenField({ register, balanceType, insertIndex }: BalanceTypeHiddenFieldProps) {

    return <FormControl sx={{ display: 'none' }}>
        <OutlinedInput
            {...register(`ledgerItems.${insertIndex}.type`, {
                required: true,
            })}
            sx={{ display: 'none' }}
            defaultValue={`${balanceType}`}
        >
        </OutlinedInput>
    </FormControl>
}