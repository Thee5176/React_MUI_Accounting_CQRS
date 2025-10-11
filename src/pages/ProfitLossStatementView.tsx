import Typography from "@mui/material/Typography";
import CollapsibleTable from "../components/profitloss/CollapsibleTable";

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