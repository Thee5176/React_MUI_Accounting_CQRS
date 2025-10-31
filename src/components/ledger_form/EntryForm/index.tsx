import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";
import { useBalance } from "../../../hooks/balance/useBalance";
import useStepper from "../../../hooks/stepper/useStepper";
import ErrorAlert from "./ErrorAlert";
import DateField from "./FormFields/DateField";
import DescriptionField from "./FormFields/DescriptionField";
import type { LedgerEntry } from "./FormUtils";
import LedgerItemsFormTable from "./LedgerItemsFormTable";

export default function EntryForm() {
  const {
    formState: { errors },
    trigger,
  } = useFormContext<LedgerEntry>();

  const { isBalanced } = useBalance();
  const { next } = useStepper();

  const handleNext = async () => {
    // Validate the whole step; focus the first invalid field automatically
    const isValid = await trigger(undefined, { shouldFocus: true });

    if (isValid && isBalanced) {
      next();
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
        disabled={!isBalanced}
      >
        Next
      </Button>
    </>
  );
}