import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function AmountField() {
    return <FormControl sx={{py:3}}>
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
        />
    </FormControl>
}