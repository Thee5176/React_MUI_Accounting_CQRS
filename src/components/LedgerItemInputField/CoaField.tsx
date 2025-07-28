import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import type { RegisterIndexProps } from './index';

interface AvailableCodeOfAccount {
    code: number;
    title: string;
    type: string;
}

export default function CoaField({register, insertIndex}:RegisterIndexProps) {
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
            <Select
                {...register(`ledgerItems.${insertIndex}.coa`, {
                    required: true,
                })}
                defaultValue=""
            >
                <MenuItem value="">
                    <em>Choose COA</em>
                </MenuItem>
                {codeOfAccounts.map((coa, idx) => (
                    <MenuItem key={`${coa.code}-${insertIndex}-${idx}`} value={coa.code}>
                        {coa.code} - {coa.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}