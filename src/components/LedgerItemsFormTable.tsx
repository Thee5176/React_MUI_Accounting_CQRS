import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import type { Control, FieldErrors } from 'react-hook-form'
import type { LedgerEntry, LedgerItem } from '../pages/LedgerEntryForm'
import BalanceCheckRow from './BalanceAmountCheck'
import LedgerItemInputRow from './LedgerItemInputRow'

interface LedgerItemsFormProps{
    control: Control<LedgerEntry>;
    errors: FieldErrors<LedgerEntry>;
    getValues: (payload?: string) => LedgerItem[];
}

export default function LedgerItemsFormTable({control, errors, getValues}: LedgerItemsFormProps) {

    const BalanceTypes: string[] = ['Debit', 'Credit']

    // use for adjust row-span for Table Header
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
                            <TableCell sx={{ width:'30%' }} align='center' rowSpan={totalRowCount} variant='head'>
                                <Typography variant='h4'>{type}</Typography>
                            </TableCell>
                            <TableCell sx={{ width:'30%'}} variant='head'>
                                Code of Account
                            </TableCell>
                            <TableCell sx={{ width:'30%'}} variant='head'>
                                Amount
                            </TableCell>
                        </TableRow>
                        <LedgerItemInputRow 
                            control={control}
                            balanceType={type}
                            errors={errors}
                            insertFunction={insertLedgerItemForm}
                        ></LedgerItemInputRow>
                        <BalanceCheckRow type={type} getValues={getValues} />
                    </TableBody>
                </Table>
            </TableContainer>
        ))}
    </>
}