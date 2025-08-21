import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Controller, type Control } from 'react-hook-form';
import type { LedgerEntry } from '../../../pages/LedgerEntryForm';

interface BalanceTypeHiddenFieldProps {
    control: Control<LedgerEntry>;
    balanceType: string;
    insertIndex: number;
}

export default function BalanceTypeHiddenField({ control, balanceType, insertIndex }: BalanceTypeHiddenFieldProps) {

    return <FormControl sx={{ display: 'none' }}>
        <Controller
            name={`ledgerItems.${insertIndex}.balanceType`}
            control={control}
            defaultValue={balanceType}
            render={({ field }) => (
            <OutlinedInput
                {...field}
                sx={{ display: 'none' }}
            />
            )}
            rules={{ required: true }}
        />
    </FormControl>
}