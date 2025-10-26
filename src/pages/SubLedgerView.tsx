import Typography from "@mui/material/Typography";
import TransactionDataGrid from "../components/ledger_list/TransactionDataGrid";

export default function GeneralLedgerView() {
    return (
        <>
            <Typography variant="h2">
                Subsidiary Ledger
            </Typography>
            <TransactionDataGrid />
        </>
    );
}