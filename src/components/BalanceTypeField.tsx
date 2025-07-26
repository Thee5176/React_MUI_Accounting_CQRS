import type { SelectChangeEvent } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function BalanceTypeField() {
    // BalanceTypeField - hook
    const [balanceType, setBalanceType] = useState('')
    
    const handleDropDown = ( event: SelectChangeEvent) => {
    setBalanceType(event.target.value);
    }

    return <FormControl sx={{display:"none"}} >
    <InputLabel sx={{display:"none"}} id="balance-type">Balance Type</InputLabel>
    <Select
        labelId="balance-type"
        id="demo-select-small"
        value={balanceType}
        label="Age"
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