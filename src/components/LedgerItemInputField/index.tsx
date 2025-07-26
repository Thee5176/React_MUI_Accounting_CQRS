import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
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
    balanceType: string;
    insertFunction: () => void;
}

export default function LedgerItemInputField ({register, balanceType, insertFunction}:LedgerItemInputFieldProps) {
    
    const [insertRowCount, setInsertRowCount] = useState(1);
    const insertLedgerItemForm = () => {
        setInsertRowCount(prev => prev + 1)
        insertFunction();
    }
    
    const adjustedIndex = (balanceType:string, insertIndex:number) => {
        return balanceType == 'Debit' ? insertIndex * 2 : (insertIndex * 2) + 1;
    };

    return (
        <>
            {Array.from({ length: insertRowCount }).map((_, insertIndex: number) => (
                <TableRow key={`ledgeritems-${adjustedIndex(balanceType, insertIndex)}`}>
                    <TableCell>
                        <CoaField register={register} insertIndex={adjustedIndex(balanceType, insertIndex)}/>
                    </TableCell>
                    <TableCell>
                        <AmountField register={register} insertIndex={adjustedIndex(balanceType, insertIndex)}/>
                    </TableCell>
                    <TableCell sx={{ display:'none'}}>
                        <BalanceTypeField register={register} balanceType={balanceType} insertIndex={ adjustedIndex(balanceType, insertIndex)}/>
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