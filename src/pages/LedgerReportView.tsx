import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import LedgerDataGrid from "../components/ledger_list/LedgerDataGrid";

export default function GeneralLedgerView() {
    const [Toggled, setToggled] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggled(event.target.checked);
    };
    return (
      <>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h2">
            {Toggled ? "Subsidiary Ledger" : "General Ledger"}
          </Typography>
          <Switch
            value={Toggled ? "Subsidiary Ledger" : "General Ledger"}
            checked={Toggled}
            onChange={handleChange}
          />
        </Box>
        <LedgerDataGrid isSubsidiary={Toggled} />
      </>
    );
}