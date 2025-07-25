import { FormControl, FormGroup, InputLabel, MenuItem, OutlinedInput, Select, type SelectChangeEvent } from "@mui/material";
import { useState } from "react";


// DateField - placeholder
const currentDate = new Date().toISOString();


export default function LedgerCreateForm() {
    // BalanceTypeField - hook
    const [balanceType, setBalanceType] = useState('')
    
    const handleDropDown = ( event: SelectChangeEvent) => {
        setBalanceType(event.target.value);
    }

    return (
        <FormGroup>
            <FormControl>
                <InputLabel htmlFor="date" required>
                    Date
                </InputLabel>
                <OutlinedInput
                    id="date"
                    name="date"
                    type="date"
                    placeholder="John"
                    autoComplete={currentDate}
                    required
                    size="small"
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="description" required>
                    Description
                </InputLabel>
                <OutlinedInput
                    id="description"
                    name="description"
                    type="description"
                    placeholder="Snow"
                    autoComplete="description"
                    required
                    size="small"
                />
            </FormControl>
            <FormControl>
                <InputLabel id="balance-type">Type</InputLabel>
                <Select
                    labelId="balance-type"
                    id="demo-select-small"
                    value={balanceType}
                    label="Age"
                    onChange={handleDropDown}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Debit'}>Debit</MenuItem>
                    <MenuItem value={'Credit'}>Credit</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="amount" required>
                    Amount
                    </InputLabel>
                    <OutlinedInput
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    autoComplete="amount"
                    required
                    size="small"
                />
            </FormControl>
            
        </FormGroup>
    );
}