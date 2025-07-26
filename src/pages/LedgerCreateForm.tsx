import { FormControl, FormGroup, InputLabel, OutlinedInput, Typography } from "@mui/material";
import BalanceTypeField from "../components/BalanceTypeField";
import LedgerItemsFormTable from "../components/LedgerItemsFormTable";

export default function LedgerCreateForm() {
    // DateField - prefilled today's date
    const currentDate = new Date().toISOString().substring(0,10);

    return (
        <>
        <Typography sx={{py:3}} variant='h2'>Record Transaction Form</Typography>
        <FormGroup>
            <FormControl sx={{py:3}}>
                <InputLabel htmlFor="date" required>
                    Date
                </InputLabel>
                <OutlinedInput
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={currentDate}
                    required
                />
            </FormControl>
            <FormControl sx={{py:3}}>
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
                />
            </FormControl>
            <LedgerItemsFormTable></LedgerItemsFormTable>
            <BalanceTypeField></BalanceTypeField>
        </FormGroup>
        </>
    );
}