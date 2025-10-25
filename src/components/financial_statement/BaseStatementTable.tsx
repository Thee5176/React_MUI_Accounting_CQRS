import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useRef, useState } from "react";
import { Row } from "./index";
import { fetchRow, type formatType } from "./RequestFunction";

export default function BaseStatementTable({reportId}: { reportId: number }) {
  const [rows, setRows] = useState<formatType[]>([]);
  const didFetchRef = useRef(false);

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    fetchRow(reportId, setRows).catch(console.error);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ maxWidth: "15%" }}/>
            <TableCell>Accounting Element</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="center">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}

          {/* TODO: Customized Last Row for each report type */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}