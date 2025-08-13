import Typography from "@mui/material/Typography";
import TransactionDataGrid from "../components/TransactionDataGrid";

export default function GeneralLedgerView() {
    return (
        <>
            <Typography variant="h2">
                General Ledger
            </Typography>
            <TransactionDataGrid />
        </>
    );
}