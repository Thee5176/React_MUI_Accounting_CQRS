import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import ErrorAlert from "../components/ledger_form/ErrorAlert";
import DateField from "../components/ledger_form/LedgerInputField/DateField";
import DescriptionField from "../components/ledger_form/LedgerInputField/DescriptionField";
import LedgerItemsFormTable from "../components/ledger_form/LedgerItemsFormTable/index";
import { axiosCommandClient } from "../service/api";

export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  ledgerItems: LedgerItem[];
  timestamp: string;
}

export interface LedgerItem {
  coa: string;
  amount: number;
  balanceType: string;
}

export default function LedgerEntryForm() {
  // declare FormHook into Context
  const formContext = useForm<LedgerEntry>({
        defaultValues: {
          id: "",
        date: "",
        description: "",
        ledgerItems: [
          { coa: "", amount: 0, balanceType: "Debit" },
          { coa: "", amount: 0, balanceType: "Credit" },
        ],
        timestamp: "",
        },
      });
  
  // get FormHook from Context
  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = formContext;

  // Send Data to Command Service
  const sendLedgerEntry = async (data: LedgerEntry) => {  
    
    try {
      const response = await axiosCommandClient.post('/ledger',data);
      console.log(response.data);
      console.log(response.status);
      return response.data;
      
    } catch (error) {
      console.error('Failed to send ledger entry data:', error);
      throw error;
    }
  }

  const onSubmit: SubmitHandler<LedgerEntry> = async (data: LedgerEntry) => {
    // Add id and timestamp to the data
    data.timestamp = new Date().toISOString();

    // Adjust null and fix ledgeritem order
    data.ledgerItems = data.ledgerItems
      .filter(item => item != null)
      .map((item, idx) => ({
          ...item,
          id: idx + 1
    }));

    console.log(data);
    const result = await sendLedgerEntry(data);
    console.log(result);
  };
  // Reset form after submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        id: "",
        date: "",
        description: "",
        ledgerItems: [
          { coa: "", amount: 0, balanceType: "Debit" },
          { coa: "", amount: 0, balanceType: "Credit" },
        ],
        timestamp: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  console.log(watch());
  return (
    <>
      <Typography sx={{ py: 3 }} variant="h2">
        Record Transaction Form
      </Typography>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <DateField />
            <ErrorAlert message={errors.date?.message} />

            <DescriptionField />
            <ErrorAlert message={errors.description?.message} />

            <LedgerItemsFormTable />
            
            <Button type="submit" variant="contained" sx={{ my : 2 }}>
              Record
            </Button>
          </FormGroup>
        </form>
      </FormProvider>
    </>
  );
}
