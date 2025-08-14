import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Controller, useFormContext } from 'react-hook-form';
import type { LedgerEntry } from '../../../pages/LedgerEntryForm';

interface BalanceTypeHiddenFieldProps {
    balanceType: string;
    insertIndex: number;
}

export default function BalanceTypeHiddenField({ balanceType, insertIndex }: BalanceTypeHiddenFieldProps) {
    const {control} = useFormContext<LedgerEntry>();

    return (
        <FormControl sx={{ display: 'none' }}>
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
    );
}