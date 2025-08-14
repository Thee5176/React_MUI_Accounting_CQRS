import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import type { controlIndexProps } from './index';

interface AvailableCodeOfAccount {
    code: number;
    title: string;
    type: string;
}

export default function CoaField({control, insertIndex}:controlIndexProps) {
    // fetch list of available COA from Query Service
    const [codeOfAccounts, setCodeOfAccounts] = useState<AvailableCodeOfAccount[]>([]);
    
    const fetchCoa = async () => {
        const res = await fetch('http://localhost:8182/available-coa/json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data: AvailableCodeOfAccount[] = await res.json();
        setCodeOfAccounts(data);
    };
    
    useEffect(() => {
        fetchCoa();
    }, []);

    return (
        <FormControl sx={{ py: 3, width: '60%', minWidth: '171px' }}>
            <Controller 
                control={control}
                name={`ledgerItems.${insertIndex}.coa`}
                rules={{
                    required: { value: true, message: 'COA is required' },
                }}
                render={({ field }) => (
                    <Select {...field}>
                        <MenuItem>
                            <em>Choose COA</em>
                        </MenuItem>
                        {codeOfAccounts.map((coa, idx) => (
                            <MenuItem key={`${coa.code}-${insertIndex}-${idx}`} value={coa.code}>
                                {coa.code} - {coa.title}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>
    );
}