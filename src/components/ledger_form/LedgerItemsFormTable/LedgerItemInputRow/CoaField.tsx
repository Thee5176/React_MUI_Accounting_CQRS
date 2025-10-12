import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useProvideCoa from '../../../../hooks/coa';
import type { LedgerEntry } from '../../../../pages/LedgerEntryForm';

export default function CoaField({ insertIndex }: { insertIndex: number }) {
  const { control } = useFormContext<LedgerEntry>();
  const { codeOfAccounts, fetchCoa } = useProvideCoa();

  // Fetch COA every component mounts for latest data
  const hasFetched = useRef<boolean>(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCoa();
  }, []);

  return (
    <FormControl sx={{ py: 3, width: "60%", minWidth: "171px" }}>
      <Controller
        control={control}
        name={`ledgerItems.${insertIndex}.coa`}
        defaultValue=""
        rules={{
          required: { value: true, message: "COA is required" },
        }}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            inputRef={field.ref}
            displayEmpty
          >
            <MenuItem value="">
              <em> -Select COA- </em>
            </MenuItem>
            {codeOfAccounts.map((coa, idx) => (
              <MenuItem
                key={`${coa.code}-${insertIndex}-${idx}`}
                value={coa.code}
              >
                {coa.code} - {coa.title}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}