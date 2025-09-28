import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import BalanceCheckRow from './BalanceAmountCheck'
import LedgerItemInputRow from './LedgerItemInputRow'

export default function LedgerItemsFormTable() {    

    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label={`LedgerItemInputTable`}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "10%" }} variant="head">
                  {/* Blank cell for delete button */}
                </TableCell>
                <TableCell sx={{ width: "30%" }} variant="head">
                  Code of Account
                </TableCell>
                <TableCell sx={{ width: "30%" }} variant="head">
                  Amount
                </TableCell>
                <TableCell sx={{ width: "30%" }} variant="head">
                  Balance Type
                </TableCell>
              </TableRow>
              <LedgerItemInputRow />
              <BalanceCheckRow />
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
}