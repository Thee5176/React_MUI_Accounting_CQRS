import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";
import ErrorAlert from "./ErrorAlert";
import type { LedgerEntry } from "./FormUtils";
import DateField from "./LedgerInputField/DateField";
import DescriptionField from "./LedgerInputField/DescriptionField";
import LedgerItemsFormTable from "./LedgerItemsFormTable";

type EntryFormProps = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function EntryForm({ setActiveStep }: EntryFormProps) {
  const {
    formState: { errors },
    trigger,
  } = useFormContext<LedgerEntry>();


  const handleNext = async () => {
    // Validate the whole step; focus the first invalid field automatically
    const isValid = await trigger(undefined, { shouldFocus: true });
    if (isValid) {
      setActiveStep(1);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <DateField />
        <ErrorAlert message={errors.date?.message} />
        <DescriptionField />
        <ErrorAlert message={errors.description?.message} />
      </Box>

      <LedgerItemsFormTable />
      <Button
        type="button"
        onClick={handleNext}
        variant="contained"
        sx={{ my: 2 }}
      >
        Next
      </Button>
    </>
  );
}