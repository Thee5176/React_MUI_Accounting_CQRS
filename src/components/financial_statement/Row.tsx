import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import DetailedRow from './DetailedRow';
import type { formatType } from './FetchUtil';

export function Row({ row }: { row: formatType }) {
  const [open, setOpen] = useState(false);

  const checkDebit = (title: string) => {
    const debitKeywords = ['asset', 'expense'];
    return debitKeywords.some(keyword => title.toLowerCase().includes(keyword));
  };

  return (
    <>
      <TableRow sx={{ "& td, & th": { borderBottom: "none" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography sx={{ textTransform: "capitalize" }} variant="h6">
            {row.name}
          </Typography>
        </TableCell>
        <TableCell align="right">{row.count == 0 ? "-" : row.count.toLocaleString()}</TableCell>
        <TableCell align="right">
          {checkDebit(row.name) ? row.balance.toLocaleString() : 0}
        </TableCell>
        <TableCell align="right">
          {checkDebit(row.name) ? 0 : row.balance.toLocaleString()}
        </TableCell>
      </TableRow>

      <DetailedRow row={row} open={open} />
    </>
  );
}
