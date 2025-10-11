import Typography from "@mui/material/Typography";
import CollapsibleTable from "../components/financial_statement/CollapsibleTable";

export default function GeneralLedgerView() {
    return (
      <>
        <Typography sx={{ py: 3 }} variant="h2">
          Profit and Loss Statement
        </Typography>
        <CollapsibleTable />
      </>
    );
}