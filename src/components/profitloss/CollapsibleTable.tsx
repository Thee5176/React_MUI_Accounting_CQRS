import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useRef, useState } from "react";
import { axiosQueryClient } from "../../service/api";
import type { ProfitLossWithNetIncome } from "../../types/profitLoss";
import { Row } from "./index";

type formatType = Array<ReturnType<typeof formatData>>;


// Safe type guard for array items
const isCoaItem = (i: unknown): i is { code: number; balance: number } => {
  if (typeof i !== "object" || i === null) return false;
  const rec = i as Record<string, unknown>;
  return typeof rec["code"] === "number" && typeof rec["balance"] === "number";
};


function formatData(
  name: string,
  count: number,
  balance: number,
  coa_list: { code: number; balance: number }[]
) {
  return {
    name,
    count,
    balance,
    coa_list,
  };
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState<formatType>([]);
  const didFetchRef = useRef(false);

  const fetchRow = async () => {
    const data = await axiosQueryClient
      .get<ProfitLossWithNetIncome>("/api/profit-loss-statement")
      .then((res) => res?.data ?? null)
      .catch(() => null);

    if (data == null) {
      console.warn(
        "ProfitLoss API returned null/invalid payload; rows cleared."
      );
      setRows([]);
      return;
    }

    console.log("Fetch Profit/Loss Data: ", data);

    try {
      // Build rows from known array properties
      const rowsData = [
        { name: 'revenue', value: data.revenue },
        { name: 'expenses', value: data.expenses }
      ]
        .filter(({ value }) => Array.isArray(value))
        .map(({ name, value }) => {
          const list = value.filter(isCoaItem) as { code: number; balance: number }[];
          const total = list.reduce((sum, cur) => sum + cur.balance, 0);
          return formatData(name, list.length, total, list);
        });
      setRows(rowsData);
    } catch (e) {
      console.error("Transform Data Failed", e);
      setRows([]);
    }
  };

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    
    fetchRow().catch(console.error);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Accounting Element</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
