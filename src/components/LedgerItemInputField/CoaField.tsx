import { FormControl, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { RegisterIndexProps } from './index';

interface AvailableCodeOfAccount {
    code: number;
    title: string;
    type: string;
}

export default function CoaField({register, insertIndex}:RegisterIndexProps) {
    // fetch list of available COA from Query Service
    const [codeOfAccounts, setCodeOfAccounts] = useState<AvailableCodeOfAccount[]>([]);
    useEffect(() => {
        fetch('http://localhost:8182/available-coa/json', {
            method: 'POST',
        })
            .then((res: Response) => res.json())
            .then((data: AvailableCodeOfAccount[]) => setCodeOfAccounts(data));
    }, []);

    // update selected Code
    const [selectedCode, setSelectedCode] = useState('');

    return <FormControl sx={{py:3, width:'60%', minWidth:'171px'}}>
        <Select
            {...register(`ledgerItems.${insertIndex}.coa`)}
            value={selectedCode}
            onChange={e => setSelectedCode(e.target.value as string)}
            required
        >
            {codeOfAccounts.map((coa, idx) => (
                <MenuItem key={`${coa.code}-${insertIndex}-${idx}`} value={coa.code}>
                    {coa.code} - {coa.title}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}