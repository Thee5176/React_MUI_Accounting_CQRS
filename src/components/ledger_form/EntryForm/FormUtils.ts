import { type SubmitHandler } from "react-hook-form";
import { axiosCommandClient } from "../../../service/api";

// Send Data to Command Service
const sendLedgerEntry = async (data: LedgerEntry) => {
  try {
    const response = await axiosCommandClient.post("/ledger", data);
    console.log(response.data);
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.error("Failed to send ledger entry data:", error);
    throw error;
  }
};

export const onSubmit: SubmitHandler<LedgerEntry> = async (
  data: LedgerEntry
) => {
  // Add id and timestamp to the data
  data.timestamp = new Date().toISOString();

  // Adjust null and fix ledgeritem order
  data.ledgerItems = data.ledgerItems
    .filter((item) => item != null)
    .map((item, idx) => ({
      ...item,
      id: idx + 1,
    }));

  console.log(data);
  const result = await sendLedgerEntry(data);
  console.log(result);
};

export const formInitialValue = {
  id: "",
  date: new Date().toISOString().slice(0, 10),
  ledgerItems: [
    { coa: 0, amount: 0, balanceType: "Debit" },
    { coa: 0, amount: 0, balanceType: "Credit" },
  ],
  timestamp: "",
};
export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  ledgerItems: LedgerItem[];
  timestamp: string;
}

export interface LedgerItem {
  coa: number;
  amount: number;
  balanceType: string;
}