import type { SelectChangeEvent } from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function BalanceTypeField() {
    // BalanceTypeField - hook
    const [balanceType, setBalanceType] = useState('')
    
    const handleDropDown = ( event: SelectChangeEvent) => {
        setBalanceType(event.target.value);
    }

    return <FormControl sx={{display:"none"}} >
    <Select
        id="select-balance-type"
        value={balanceType}
        onChange={handleDropDown}
        sx={{display:"none"}}
        required
    >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        <MenuItem value={'Debit'}>Debit</MenuItem>
        <MenuItem value={'Credit'}>Credit</MenuItem>
    </Select>
    </FormControl>
}