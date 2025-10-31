import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  List,
  ListItem,
  ListItemText,
  styled,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import { useState } from "react";
import { useBalance } from "../../../../hooks/balance/useBalance";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// Expand Icon Animation
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return (
    <IconButton
      style={{
        transform: expand ? "rotate(180deg)" : "rotate(0deg)",
      }}
      {...other}
    />
  );
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BalanceCheckRow() {
  const { debitTotal, creditTotal, isBalanced, diff } = useBalance();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <span>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </span>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Typography variant="h6">Total Balance</Typography>
        </TableCell>
        <TableCell colSpan={2} sx={{ textAlign: "end" }}>
          <Typography variant="h6">
            <span id="total-balance">$ {isBalanced ? debitTotal.toLocaleString() : formatNumberWithSign(diff) }</span>
            <span id="balance-status">
              {isBalanced ? (
                <BalanceCheckPassing />
              ) : (
                <BalanceCheckFailed diff={diff} />
              )}
            </span>
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow sx={{ display: expanded ? "table-row" : "none" }}>
        <TableCell colSpan={4}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Debit: ${debitTotal.toLocaleString()}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Credit: ${creditTotal.toLocaleString()}`}
                />
              </ListItem>
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const BalanceCheckPassing = () => (
  <Tooltip title="Balanced Check Passing — totals match" arrow>
    <IconButton aria-label="balanced" size="large">
      <VerifiedIcon color="success" />
    </IconButton>
  </Tooltip>
);

const BalanceCheckFailed = ({ diff }: { readonly diff: number }) => (
  <Tooltip
    title={`Unbalanced — totals do not match by ${formatNumberWithSign(diff)}`}
    arrow
  >
    <IconButton aria-label="unbalanced" size="large">
      <ErrorOutlineIcon color="error" />
    </IconButton>
  </Tooltip>
);

function formatNumberWithSign(num: number): string {
  if (num > 0) {
    return `+${num.toLocaleString()}`; // Prepend '+' for positive numbers
  } else if (num < 0) {
    return `${num.toLocaleString()}`; // Negative numbers already have a '-'
  } else {
    return "0"; // Handle zero specifically, or you could return '+0' or '-0' if preferred
  }
}