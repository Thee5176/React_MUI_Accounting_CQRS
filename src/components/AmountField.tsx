import { FormControl, OutlinedInput } from "@mui/material";

export default function AmountField() {
    return <FormControl sx={{py:3}}>
        <OutlinedInput
            id="input-amount"
            name="amount"
            type="number"
            placeholder="0.00"
            autoComplete="amount"
            required
        />
    </FormControl>
}