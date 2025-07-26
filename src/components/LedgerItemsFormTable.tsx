import { AddCircle } from '@mui/icons-material'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import AmountField from "./AmountField"
import CoaField from "./CoaField"

export default function LedgerItemsFormTable() {
    
    const BalanceTypes: string[] = ["Dr.", "Cr."]

    // add LedgerItems button
    const insertLedgerItemForm = () => {

    }

    return <TableContainer>
                {BalanceTypes.map( type => (
                    <Table sx={{ minWidth: 700 }} aria-label="LedgerItemsFormTable">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" rowSpan={2} variant="head">
                                    {type}
                                </TableCell>
                                <TableCell variant="head">
                                    Code of Account
                                </TableCell>
                                <TableCell variant="head">
                                    Amount
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell rowSpan={2} />
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