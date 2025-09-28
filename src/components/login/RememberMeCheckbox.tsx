import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import theme from "../../styles/theme";

// TODO : this enable the cookie
export default function RememberMeCheckbox() {
  return (
    <FormControlLabel
      label="Remember me"
      control={
        <Checkbox
          name="remember"
          value="true"
          color="primary"
          sx={{ padding: 0.5, "& .MuiSvgIcon-root": { fontSize: 20 } }}
        />
      }
      slotProps={{
        typography: {
          color: "textSecondary",
          fontSize: theme.typography.pxToRem(14),
        },
      }}
    />
  );
}