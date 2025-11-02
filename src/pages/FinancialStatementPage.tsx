import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import BaseStatementTable from "../components/financial_statement/BaseStatementTable";

export default function FinancialSheetPage() {

  const [value, setValue] = useState<number>(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log("Selected Tab:", newValue);
  };
  return (
    <>
      <Typography sx={{ py: 3 }} variant="h2">
        Financial Statement
      </Typography>
      <TabContext value={value as unknown as string}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Balance Sheet Statement" value={1} />
            <Tab label="Profit Loss Statement" value={2} />
            <Tab label="Cashflow Statement" value={3} disabled/>
          </TabList>
        </Box>
        <TabPanel value={1}>
          <BaseStatementTable reportId={value}/>
        </TabPanel>
        <TabPanel value={2}>
          <BaseStatementTable reportId={value}/>
        </TabPanel>
        {/* <TabPanel value={3}>
          <BaseStatementTable reportId={value}/>
        </TabPanel> */}
      </TabContext>
    </>
  );
}