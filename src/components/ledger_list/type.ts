//instance type of LedgerItemsAggregate
interface LedgerItemsAggregate {
    coa: number;
    amount: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}

//instance type of LedgerResponseDTO
export interface LedgerResponse {
    ledgerId: string;
    date: string;
    description: string;
    ledgerItems: LedgerItemsAggregate[];
    createdAt: string;
    updatedAt: string;
}