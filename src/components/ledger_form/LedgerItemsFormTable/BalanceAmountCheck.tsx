import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerifiedIcon from "@mui/icons-material/Verified";
import { List, ListItem, ListItemText, styled, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { LedgerEntry } from "../../../pages/LedgerEntryForm";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// Expand Icon Animation
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton style={{
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)'
  }} {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  })
}));

export default function BalanceCheckRow() {
  const { getValues } = useFormContext<LedgerEntry>();

  // calculate total row count based on balance types
  function calculateBalance(): number {
    const ledgerItems = getValues("ledgerItems") || [];

    return ledgerItems
      .filter((item) => item.balanceType === "Debit")
      .reduce((acc, item) => acc + (item.amount || 0), 0);
  }

  function checkBalance(inputType?: string): [boolean, number] {
    const ledgerItems = getValues("ledgerItems") || [];
    const totalDebit = ledgerItems
      .filter((item) => item.balanceType === "Debit")
      .reduce((acc, item) => acc + (item.amount || 0), 0);

    const totalCredit = ledgerItems
      .filter((item) => item.balanceType === "Credit")
      .reduce((acc, item) => acc + (item.amount || 0), 0);

    switch (inputType) {
      case "Debit":
        return [true, totalDebit];
        break;
      case "Credit":
        return [true, totalCredit];
        break;
      default:
        return [totalDebit === totalCredit, totalDebit - totalCredit];
    }

  }

  const BalanceCheckPassing = () => (
    <Tooltip title="Balanced Check Passing — totals match" arrow>
      <IconButton aria-label="balanced" size="large">
        <VerifiedIcon color="success" />
      </IconButton>
    </Tooltip>
  );

  const BalanceCheckFailed = () => (
    <Tooltip
      title={`Unbalanced — totals do not match by ${checkBalance()[1]}`}
      arrow
    >
      <IconButton aria-label="unbalanced" size="large">
        <ErrorOutlineIcon color="error" />
      </IconButton>
    </Tooltip>
  );

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
            <span id="total-balance">
              $ {checkBalance()[0] ? `${calculateBalance()}` : `--`}
            </span>
            <span id="balance-status">
              {checkBalance()[0] ? (
                <BalanceCheckPassing />
              ) : (
                <BalanceCheckFailed />
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
                  primary={`Debit: ${checkBalance("Debit")[1]}`} 
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Credit: ${checkBalance("Credit")[1]}`}
                />
              </ListItem>
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
