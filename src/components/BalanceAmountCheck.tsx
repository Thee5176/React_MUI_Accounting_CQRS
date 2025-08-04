import { TableCell, TableRow, Typography } from "@mui/material";
import type { LedgerItem } from "../pages/LedgerEntryForm";

export default function BalanceCheckRow({ type, getValues }: { type: string; getValues: (payload?: string) => LedgerItem[] }) {
    // calculate total row count based on balance types
    const calculateBalance : (type:string) => number = (type:string) => {
        const ledgerItems = getValues("ledgerItems") || [];
        return ledgerItems.filter(item => item.type === type)
            .reduce((acc, item) => acc + (item.amount || 0), 0);
    };
    
    return (
        <>
            <TableRow>
                <TableCell colSpan={1} sx={{ textAlign:'center' }}>
                    <Typography variant='h6'>Total {type}</Typography>
                </TableCell>
                <TableCell colSpan={2} sx={{ textAlign:'end' }}>
                    <Typography variant='h6'>
                        $<span id={`total-${type.toLowerCase()}`}>{calculateBalance(type)}</span>
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    );
}
