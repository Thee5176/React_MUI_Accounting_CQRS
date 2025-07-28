import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LedgerEntry } from "../../pages/LedgerCreateForm";
import ErrorAlert from "../ErrorAlert";
import AmountField from "./AmountField";
import BalanceTypeField from "./BalanceTypeField";
import CoaField from "./CoaField";

export interface RegisterIndexProps {
    register: UseFormRegister<LedgerEntry>;
    insertIndex: number;
}

interface LedgerItemInputFieldProps {
    register: UseFormRegister<LedgerEntry>;
    errors: FieldErrors<LedgerEntry>;
    balanceType: string;
    insertFunction: () => void;
}

export default function LedgerItemInputField ({register, balanceType, errors, insertFunction}:LedgerItemInputFieldProps) {
    
    const [insertRowCount, setInsertRowCount] = useState(1);
    const insertLedgerItemForm = () => {
        setInsertRowCount(prev => prev + 1)
        insertFunction();
    }
    
    const adjustedIndex = (balanceType:string, insertIndex:number) => {
        // Debit: starts at 0, Credit: starts at 1
        // Debit: 0, 2, 4, ... Credit: 1, 3, 5, ...
        return balanceType == 'Debit' ? insertIndex * 2 : (insertIndex * 2) + 1;
    };

    return (
        <>
            {Array.from({ length: insertRowCount }).map((_, insertIndex: number) => (
                <TableRow key={`ledgeritems-${adjustedIndex(balanceType, insertIndex)}`}>
                    <TableCell>
                        <CoaField register={register} insertIndex={adjustedIndex(balanceType, insertIndex)}/>
                        <ErrorAlert
                            message={errors.ledgerItems?.[adjustedIndex(balanceType, insertIndex)]?.coa?.message}
                        />
                    </TableCell>
                    <TableCell>
                        <AmountField register={register} insertIndex={adjustedIndex(balanceType, insertIndex)}/>
                        <ErrorAlert
                            message={errors.ledgerItems?.[adjustedIndex(balanceType, insertIndex)]?.amount?.message}
                        />
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