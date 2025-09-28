import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from 'react-hook-form';
import type { LedgerEntry } from '../../../../pages/LedgerEntryForm';
import { axiosQueryClient } from '../../../../service/api';

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

  const fetchCoa = async () => {
    try {
      const response = await axiosQueryClient.post('/available-coa/json');
      const data: AvailableCodeOfAccount[] = response.data;
      setCodeOfAccounts(data);
    } catch (err) {
      console.error('Failed to fetch COA', err);
    }
  };

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