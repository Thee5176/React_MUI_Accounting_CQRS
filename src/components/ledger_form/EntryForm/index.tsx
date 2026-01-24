import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";
import { useBalance } from "../../../hooks/balance/useBalance";
import useStepper from "../../../hooks/stepper/useStepper";
import ErrorAlert from "./ErrorAlert";
import DateField from "./FormFields/DateField";
import DescriptionField from "./FormFields/DescriptionField";
import { formInitialValue, type LedgerEntry } from "./FormUtils";
import LedgerItemsFormTable from "./LedgerItemsFormTable";

export default function EntryForm() {
  const {
    formState: { errors },
    trigger,
  } = useFormContext<LedgerEntry>();

  const { isBalanced } = useBalance();
  const { next } = useStepper();
  const { user } = useAuth0();

  const handleNext = async () => {
    // Validate the whole step; focus the first invalid field automatically
    const isValid = await trigger(undefined, { shouldFocus: true });

    if (isValid && isBalanced) {
      next();
    }
  };

  const { reset } = useFormContext<LedgerEntry>();
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form? All unsaved changes will be lost.")) {
      reset(formInitialValue);
      const cacheKey = user?.sub ? `myFormState_${user.sub}` : "myFormState";
      localStorage.removeItem(cacheKey);
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

      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <Button
          type="button"
          onClick={handleNext}
          variant="contained"
          disabled={!isBalanced}
          sx={{ flex: 1 }}
        >
          Next
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant="outlined"
          color="error"
          sx={{ flex: 1 }}
        >
          Reset Form
        </Button>
      </Box>
    </>
  );
}