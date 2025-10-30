import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';
import type { LedgerEntry } from '../../../../../pages/LedgerEntryForm';

export default function BalanceTypeField( {insertIndex} : {insertIndex : number} ) {
    const {control} = useFormContext<LedgerEntry>();

    const BalanceType : string[] = ["Debit", "Credit"];

    return (
      <FormControl sx={{ width: "100%" }}>
        <Controller
          control={control}
          name={`ledgerItems.${insertIndex}.balanceType`}
          defaultValue=""
          rules={{
            required: { value: true, message: "Balance type is required" },
          }}
          render={({ field }) => (
            <Select
              value={field.value ?? "Debit"}
              onChange={field.onChange}
              onBlur={field.onBlur}
              inputRef={field.ref}
              displayEmpty
            >
              {BalanceType.map((type, idx) => (
                <MenuItem
                  key={`${type}-${insertIndex}-${idx}`}
                  value={type}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    );
}