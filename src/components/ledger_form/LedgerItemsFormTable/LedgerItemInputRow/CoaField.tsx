import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BaseUrlContext } from '../../../../contexts/BaseUrlContext';
import type { LedgerEntry } from '../../../../pages/LedgerEntryForm';

interface AvailableCodeOfAccount {
    code: number;
    title: string;
    type: string;
}

export default function CoaField({ insertIndex }: { insertIndex: number }) {
  const { control } = useFormContext<LedgerEntry>();

  // fetch list of available COA from Query Service
  const [codeOfAccounts, setCodeOfAccounts] = useState<
    AvailableCodeOfAccount[]
  >([]);

  const endpoint = useContext(BaseUrlContext);
  const fetchCoa = async () => {
    const res = await fetch(`${endpoint.query}/available-coa/json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: AvailableCodeOfAccount[] = await res.json();
    setCodeOfAccounts(data);
  };

  useEffect(() => {
    fetchCoa();
  });

  return (
    <FormControl sx={{ width: "100%", minWidth: "171px" }}>
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