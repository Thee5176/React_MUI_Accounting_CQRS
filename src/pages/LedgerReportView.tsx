import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import LedgerDataGrid from "../components/ledger_list/LedgerDataGrid";

export default function LedgerReportView() {
    const [Toggled, setToggled] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggled(event.target.checked);
    };
    return (
      <>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2">
            {Toggled ? "Subsidiary Ledger" : "General Ledger"}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography>GL</Typography>
            <Switch
              color="default"
              checked={Toggled}
              onChange={handleChange}
            />
            <Typography>SL</Typography>
          </Box>
        </Box>
        <LedgerDataGrid isSubsidiary={Toggled} />
      </>
    );
}