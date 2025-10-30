import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useRef, useState } from "react";
import { BalanceSheetSummary, ProfitLossSummary } from "./CustomRowElement";
import { fetchRow, type formatType } from "./FetchUtil";
import { Row } from "./index";

export default function BaseStatementTable({reportId}: { readonly reportId: number }) {
  const [rows, setRows] = useState<formatType[]>([]);
  const [netIncome, setNetIncome] = useState<number>(0);
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    fetchRow(reportId, setRows, setNetIncome).catch(console.error);
  }, [reportId]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ maxWidth: "15%" }} />
            <TableCell>Accounting Element</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Debit</TableCell>
            <TableCell align="right">Credit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
          {reportId === 1 ? <BalanceSheetSummary /> : null}

          {reportId === 2 ? <ProfitLossSummary netIncome={netIncome} /> : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}