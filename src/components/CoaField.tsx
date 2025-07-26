import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

interface AvailableCodeOfAccount {
    code: number;
    title: string;
    type: string;
}

export default function CoaField() {
    const [codeOfAccounts, setCodeOfAccounts] = useState<AvailableCodeOfAccount[]>([]);
    
    // fetch list of available COA from Query Service
    useEffect(() => {
        fetch("http://localhost:8182/available-coa/json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res: Response) => res.json())
            .then((data: AvailableCodeOfAccount[]) => setCodeOfAccounts(data));
    }, []);

    return <FormControl  sx={{py:3}}>
        <InputLabel id="coa">
            Code of account
        </InputLabel>
        <Select>
            {codeOfAccounts.map(coa => (
                <MenuItem key={coa.code} value={coa.code}>
                    {coa.code} - {coa.title}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}