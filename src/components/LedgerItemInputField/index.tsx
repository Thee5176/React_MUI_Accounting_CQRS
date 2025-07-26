import { AddCircle } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { LedgerEntry } from "../../pages/LedgerCreateForm";
import AmountField from "./AmountField";
import BalanceTypeField from "./BalanceTypeField";
import CoaField from "./CoaField";

export interface RegisterIndexProps {
    register: UseFormRegister<LedgerEntry>;
    insertIndex: number;
}

interface LedgerItemInputFieldProps {
    register: UseFormRegister<LedgerEntry>;
    insertFunction: () => void;
}

export default function LedgerItemInputField ({register, insertFunction}:LedgerItemInputFieldProps) {
    
    const [insertRowCount, setInsertRowCount] = useState(1);
    const insertLedgerItemForm = () => {
        setInsertRowCount(prev => prev + 1)
        insertFunction();
    }
    
    return (
        <>
            {Array.from({ length: insertRowCount }).map((_, insertIndex: number) => (
                <TableRow key={`ledgeritems-${insertIndex}`}>
                    <TableCell>
                        <CoaField register={register} insertIndex={insertIndex}/>
                    </TableCell>
                    <TableCell>
                        <AmountField register={register} insertIndex={insertIndex}/>
                    </TableCell>
                    <TableCell sx={{ display: 'none'}}>
                        <BalanceTypeField register={register} insertIndex={insertIndex} balanceType={"debit"} />
                    </TableCell>
                </TableRow>
            ))}
            <TableRow>
                <TableCell colSpan={2} align='center'>
                    <Button onClick={insertLedgerItemForm}>
                        <AddCircle />
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
}