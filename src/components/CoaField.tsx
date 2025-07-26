import { FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import type { RegisterIndexProps } from '../pages/LedgerCreateForm';

interface AvailableCodeOfAccount {
    code: number;
    title: string;
    type: string;
}

export default function CoaField({register, itemOrder}:RegisterIndexProps) {
    // fetch list of available COA from Query Service
    const [codeOfAccounts, setCodeOfAccounts] = useState<AvailableCodeOfAccount[]>([]);
    useEffect(() => {
        fetch('http://localhost:8182/available-coa/json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res: Response) => res.json())
            .then((data: AvailableCodeOfAccount[]) => setCodeOfAccounts(data));
    }, []);

    // update selected Code
    const [selectedCode, setSelectedCode] = useState('');

    return <FormControl sx={{py:3, width:'50%'}}>
        <Select
            {...register(`ledgerItems.${itemOrder}.coa`)}
            value={selectedCode}
            onChange={e => setSelectedCode(e.target.value as string)}
            required
        >
            {codeOfAccounts.map((coa, idx) => (
                <MenuItem key={`${coa.code}-${itemOrder}-${idx}`} value={coa.code}>
                    {coa.code} - {coa.title}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}