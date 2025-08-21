import type { LedgerResponse } from "./TransactionDataGrid";

export const MockAPIData: LedgerResponse[] = [
  {
    ledgerId: "LED-2025-0001",
    date: "2025-08-18",
    description: "Office supplies purchase",
    ledgerItems: [
      {
        coa: 6100,
        amount: 120.5,
        balanceType: "Debit",
        createdAt: "2025-08-18T09:15:00.000Z",
        updatedAt: "2025-08-18T09:15:00.000Z",
      },
      {
        coa: 2000,
        amount: 120.5,
        balanceType: "Credit",
        createdAt: "2025-08-18T09:15:00.000Z",
        updatedAt: "2025-08-18T09:15:00.000Z",
      },
    ],
    createdAt: "2025-08-18T09:15:00.000Z",
    updatedAt: "2025-08-18T09:15:00.000Z",
  },
  {
    ledgerId: "LED-2025-0002",
    date: "2025-08-19",
    description: "Customer payment",
    ledgerItems: [
      {
        coa: 1000,
        amount: 800.0,
        balanceType: "Debit",
        createdAt: "2025-08-19T12:00:00.000Z",
        updatedAt: "2025-08-19T12:00:00.000Z",
      },
      {
        coa: 4100,
        amount: 800.0,
        balanceType: "Credit",
        createdAt: "2025-08-19T12:00:00.000Z",
        updatedAt: "2025-08-19T12:00:00.000Z",
      },
    ],
    createdAt: "2025-08-19T12:00:00.000Z",
    updatedAt: "2025-08-19T12:00:00.000Z",
  },
  {
    ledgerId: "LED-2025-0003",
    date: "2025-08-20",
    description: "Utilities bill",
    ledgerItems: [
      {
        coa: 6200,
        amount: 150.0,
        balanceType: "Debit",
        createdAt: "2025-08-20T08:30:00.000Z",
        updatedAt: "2025-08-20T08:30:00.000Z",
      },
      {
        coa: 1000,
        amount: 150.0,
        balanceType: "Credit",
        createdAt: "2025-08-20T08:30:00.000Z",
        updatedAt: "2025-08-20T08:30:00.000Z",
      },
    ],
    createdAt: "2025-08-20T08:30:00.000Z",
    updatedAt: "2025-08-20T08:30:00.000Z",
  },
];
