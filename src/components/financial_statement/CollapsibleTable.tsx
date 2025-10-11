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

export type formatType = ReturnType<typeof formatData>;

function formatData(
  name: string,
  count: number,
  balance: number,
  coa_list: Map<number, number>
) {
  return {
    name,
    count,
    balance,
    coa_list,
  };
}

// Convert API payload to Map<number, number> (handles plain object or Map)
function toNumericMap(input: unknown): Map<number, number> {
  if (input instanceof Map) return input as Map<number, number>;
  if (input && typeof input === "object") {
    return new Map(
      Object.entries(input as Record<string, unknown>).map(([k, v]) => [
        Number(k),
        typeof v === "number" ? v : Number(v),
      ])
    );
  }
  return new Map();
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState<formatType[]>([]);
  const didFetchRef = useRef(false);

  const fetchRow = async () => {
    const data = await axiosQueryClient
      .get<ProfitLossWithNetIncome>("/api/profit-loss-statement")
      .then((res) => res.data);

    if (data == null) {
      console.warn(
        "ProfitLoss API returned null/invalid payload; rows cleared."
      );
      return;
    }

    console.log("Fetch Profit/Loss Data: ", data);

    try {
      // Build rows from known array properties
      const rowsData: formatType[] = [
        { name: 'revenue', raw: data.revenue },
        { name: 'expenses', raw: data.expenses }
        ]
        .map(({ name, raw }) => {
          const mapped =  toNumericMap(raw);

          let total = 0;
          mapped.forEach((v) => { total += v; });
          return formatData(name, mapped.size, total, mapped);
      });
      console.log("Format Profit/Loss Data:", rowsData);
      setRows(rowsData);

    } catch (e) {
      console.error("Transform Data Failed", e);
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
