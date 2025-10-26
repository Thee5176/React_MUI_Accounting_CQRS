import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useProvideCoa from '../../hooks/coa';
import type { formatType } from './FetchUtil';

export default function DetailedRow({ row, open }: { row: formatType; open: boolean }) {
    return (
    <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
            { row.count === 0 ? <NullRow /> : <ContentRow row={row} /> }
        </Box>
        </Collapse>
    </TableCell>
    </TableRow>
    )
}

function NullRow() {
    return (
        <Typography variant="body1" color="textSecondary">
            No data available
        </Typography>
    );
}

function ContentRow({ row }: { readonly row: formatType }) {
    const { codeOfAccounts } = useProvideCoa();
    const coaMap: Record<number, string> = {};
    codeOfAccounts.forEach(coa => {
        coaMap[coa.code] = coa.title;
    });

    return (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                <TableCell>Code of Account</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Balance</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[...row.coa_list].map(([coa, balance]) => (
                <TableRow key={coa}>
                    <TableCell component="th" scope="row">{coa}</TableCell>
                    <TableCell>{coaMap[coa]}</TableCell>
                    <TableCell align="right">{balance}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
            
    )
};