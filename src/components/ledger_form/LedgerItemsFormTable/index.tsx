import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { DynamicIndexContext } from '../../../contexts/DynamicIndexContext'
import BalanceCheckRow from './BalanceAmountCheck'
import LedgerItemInputRow from './LedgerItemInputRow'

export default function LedgerItemsFormTable() {    
    // use for render with array.map
    const BalanceTypes: string[] = ['Debit', 'Credit']

    // use for adjust row-span for Table Header
    const [totalRowSpan, setTotalRowSpan] = useState(3);
    const addRowSpan: () => void = () => {
        setTotalRowSpan(prev => prev + 1)
    }

    return (
      <>
      <DynamicIndexContext.Provider value={{totalRowSpan, addRowSpan}}>
        {BalanceTypes.map((type, itemOrder) => (
          <TableContainer
            sx={{ py: 3 }}
            key={`tablecontainer-${itemOrder}`}
            component={Paper}
          >
            <Table sx={{ minWidth: 500 }} aria-label={`${type}InputTable`}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{ width: "20%" }}
                    align="center"
                    rowSpan={totalRowSpan}
                    variant="head"
                  >
                    <Typography variant="h4">{type}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "40%" }} variant="head">
                    Code of Account
                  </TableCell>
                  <TableCell sx={{ width: "40%" }} variant="head">
                    Amount
                  </TableCell>
                </TableRow>
                <LedgerItemInputRow
                  balanceType={type}
                ></LedgerItemInputRow>
                <BalanceCheckRow balanceType={type} />
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </DynamicIndexContext.Provider>
      </>
    );
}