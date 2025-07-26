import { AddCircle } from '@mui/icons-material'
import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useState } from 'react'
import AmountField from "./AmountField"
import CoaField from "./CoaField"

export default function LedgerItemsFormTable() {

    const BalanceTypes: string[] = ["Dr.", "Cr."]

    // add LedgerItems button
    const [totalrows, setTotalRows] = useState(3);
    const insertLedgerItemForm = () => {
        setTotalRows(prev => prev + 1 ) 
    }

    return <TableContainer>
                {BalanceTypes.map( type => (
                    <Table sx={{ minWidth: 700 }} aria-label={`${type}InputTable`}>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" rowSpan={totalrows} variant="head">
                                    {type}
                                </TableCell>
                                <TableCell variant="head">
                                    Code of Account
                                </TableCell>
                                <TableCell variant="head">
                                    Amount
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <CoaField />
                                </TableCell>
                                <TableCell>
                                    <AmountField />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    <Button onClick={insertLedgerItemForm}>
                                        <AddCircle />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                ))}
            </TableContainer>
}