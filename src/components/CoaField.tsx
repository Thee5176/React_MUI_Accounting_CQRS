import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

interface AvailableCodeOfAccount {
    code: number;
    title: string;
    type: string;
}

export default function CoaField() {
    // fetch list of available COA from Query Service
    const [codeOfAccounts, setCodeOfAccounts] = useState<AvailableCodeOfAccount[]>([]);
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

    // update selected Code
    const [selectedCode, setSelectedCode] = useState("");

    return <FormControl sx={{py:3}}>
        <Select
            autoWidth
            value={selectedCode}
            onChange={e => setSelectedCode(e.target.value as string)}
        >
            {codeOfAccounts.map(coa => (
                <MenuItem key={coa.code} value={coa.code}>
                    {coa.code} - {coa.title}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}