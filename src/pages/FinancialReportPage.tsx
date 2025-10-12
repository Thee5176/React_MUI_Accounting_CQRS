import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CollapsibleTable from "../components/financial_statement/CollapsibleTable";

export default function FinancialSheetPage() {

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography sx={{ py: 3 }} variant="h2">
        Financial Report
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Balance Sheet Statement" value="1" />
            <Tab label="Profit Loss Statement" value="2" />
            <Tab label="Cashflow Statement" value="3" disabled/>
          </TabList>
        </Box>
        <TabPanel value="1">
          <CollapsibleTable reportId={value} />
        </TabPanel>
        <TabPanel value="2">
          <CollapsibleTable reportId={value} />
        </TabPanel>
      </TabContext>
    </>
  );
}