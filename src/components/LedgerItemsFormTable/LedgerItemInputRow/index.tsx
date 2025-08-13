import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import type { Control, FieldErrors } from "react-hook-form";
import type { LedgerEntry } from "../../../pages/LedgerEntryForm";
import ErrorAlert from "../../ErrorAlert";
import AmountField from "./AmountField";
import BalanceTypeHiddenField from "./BalanceTypeHiddenField";
import CoaField from "./CoaField";

export interface controlIndexProps {
    control: Control<LedgerEntry>;
    insertIndex: number;
}

interface LedgerItemInputRowProps {
    control: Control<LedgerEntry>;
    errors: FieldErrors<LedgerEntry>;
    balanceType: string;
    insertFunction: () => void;
}

export default function LedgerItemInputRow ({control, balanceType, errors, insertFunction}:LedgerItemInputRowProps) {
    
    const [insertRowCount, setInsertRowCount] = useState(1); // Change to List of unique ID (still need number index -> key for input field)
    const insertLedgerItemForm = () => {
        setInsertRowCount(prev => prev + 1)                  // Change to add ID to List
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
                        <CoaField control={control} insertIndex={adjustedIndex(balanceType, insertIndex)}/>
                        <ErrorAlert
                            message={errors.ledgerItems?.[adjustedIndex(balanceType, insertIndex)]?.coa?.message}
                        />
                    </TableCell>
                    <TableCell>
                        <AmountField control={control} insertIndex={adjustedIndex(balanceType, insertIndex)}/>
                        <ErrorAlert
                            message={errors.ledgerItems?.[adjustedIndex(balanceType, insertIndex)]?.amount?.message}
                        />
                    </TableCell>
                    <TableCell sx={{ display:'none'}}>
                        <BalanceTypeHiddenField control={control} balanceType={balanceType} insertIndex={adjustedIndex(balanceType, insertIndex)}/>
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