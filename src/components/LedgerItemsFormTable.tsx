import { AddCircle } from '@mui/icons-material'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useState } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import type { LedgerEntry } from '../pages/LedgerCreateForm'
import AmountField from './AmountField'
import BalanceTypeField from './BalanceTypeField'
import CoaField from './CoaField'

interface LedgerItemsFormProps{
    register: UseFormRegister<LedgerEntry>;
}

export default function LedgerItemsFormTable({register}: LedgerItemsFormProps) {

    const BalanceTypes: string[] = ['Debit', 'Credit']

    // add LedgerItems button
    const [totalrows, setTotalRows] = useState(3);
    const insertLedgerItemForm = () => {
        setTotalRows(prev => prev + 1 ) 
    }

    return <>
        {BalanceTypes.map( (type, itemOrder) => (
            <TableContainer sx={{ py:3 }} key={`tablecontainer-${itemOrder}`} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label={`${type}InputTable`}>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center' rowSpan={totalrows} variant='head'>
                                <Typography variant='h4'>{type}</Typography>
                            </TableCell>
                            <TableCell variant='head'>
                                Code of Account
                            </TableCell>
                            <TableCell variant='head'>
                                Amount
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <CoaField register={register} itemOrder={itemOrder}/>
                            </TableCell>
                            <TableCell>
                                <AmountField register={register} itemOrder={itemOrder}/>
                                <BalanceTypeField register={register} itemOrder={itemOrder} balanceType={type}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} align='center'>
                                <Button onClick={insertLedgerItemForm}>
                                    <AddCircle />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        ))}
    </>
}