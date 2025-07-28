import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { LedgerEntry } from '../pages/LedgerCreateForm'
import LedgerItemInputField from './LedgerItemInputField'

interface LedgerItemsFormProps{
    register: UseFormRegister<LedgerEntry>;
    errors: FieldErrors<LedgerEntry>;
}

export default function LedgerItemsFormTable({register, errors}: LedgerItemsFormProps) {

    const BalanceTypes: string[] = ['Debit', 'Credit']

    // add LedgerItems button
    const [totalRowCount, setTotalRowCount] = useState(3);
    const insertLedgerItemForm = () => {
        setTotalRowCount(prev => prev + 1)
        console.log(totalRowCount);
    }

    return <>
        {BalanceTypes.map( (type, itemOrder) => (
            <TableContainer sx={{ py:3 }} key={`tablecontainer-${itemOrder}`} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label={`${type}InputTable`}>
                    <TableBody>
                        <TableRow>
                            <TableCell align='center' rowSpan={totalRowCount} variant='head'>
                                <Typography variant='h4'>{type}</Typography>
                            </TableCell>
                            <TableCell sx={{ width:'30%'}} variant='head'>
                                Code of Account
                            </TableCell>
                            <TableCell sx={{ width:'30%'}} variant='head'>
                                Amount
                            </TableCell>
                            <TableCell sx={{ width:'25%'}} variant='head'>
                                Sum
                            </TableCell>
                        </TableRow>
                        <LedgerItemInputField 
                            register={register}
                            balanceType={type}
                            errors={errors}
                            insertFunction={insertLedgerItemForm}
                        ></LedgerItemInputField>
                    </TableBody>
                </Table>
            </TableContainer>
        ))}
    </>
}