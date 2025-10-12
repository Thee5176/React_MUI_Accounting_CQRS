import Typography from "@mui/material/Typography";
import { useParams } from 'react-router-dom';
import CollapsibleTable from "../components/financial_statement/CollapsibleTable";

export default function FinancialSheetPage() {

  const { reportId } = useParams();
  return (
    <>
      <Typography sx={{ py: 3 }} variant="h2">
        Profit and Loss Statement
      </Typography>
      <CollapsibleTable reportId={reportId}/>
    </>
  );
}