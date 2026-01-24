import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProvideBalance from "../../hooks/balance/provider";
import useStepper from "../../hooks/stepper/useStepper";
import BalanceReview from "./BalanceReview";
import EntryForm from "./EntryForm";
import { formInitialValue, onSubmit, type LedgerEntry } from "./EntryForm/FormUtils";
import FormModal from "./FormModal";

const labels = ["Entry Form", "Balance Review"];

export default function MutiStepForm() {
  const { user } = useAuth0();
  const getCacheKey = () => (user?.sub ? `myFormState_${user.sub}` : "myFormState");

  //stepper
  const { activeStep, setActiveStep } = useStepper();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const defaultValues = useMemo<LedgerEntry>(() => {
    try {
      const cacheKey = getCacheKey();
      const savedData = localStorage.getItem(cacheKey);
      if (savedData) {
        const parsed = JSON.parse(savedData) as Partial<LedgerEntry>;

        return {
          id: parsed.id ?? formInitialValue.id,
          date: parsed.date ?? formInitialValue.date,
          description: parsed.description ?? "",
          ledgerItems: parsed.ledgerItems ?? formInitialValue.ledgerItems,
          timestamp: parsed.timestamp ?? formInitialValue.timestamp,
        } as LedgerEntry;
      }
      return { ...formInitialValue } as LedgerEntry;
    } catch {
      return { ...formInitialValue } as LedgerEntry;
    }
  }, [user?.sub]); // Re-run if user changes

  //form
  const formContext = useForm<LedgerEntry>({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = formContext;

  const handleSteps = (step: number) => {
    switch (step) {
      case 0:
        return <EntryForm />;
      case 1:
        return <BalanceReview />;
      default:
        throw new Error("Unknown step");
    }
  };

  const isEditMode = formContext.watch("id") !== "";

  // Reset form after submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(formInitialValue);
      setOpenModal(true);
      localStorage.removeItem(getCacheKey());
    }
  }, [reset, isSubmitSuccessful]);

  // Persist form changes to localStorage without triggering re-renders
  useEffect(() => {
    const subscription = formContext.watch((value) => {
      try {
        localStorage.setItem(getCacheKey(), JSON.stringify(value));
      } catch {
        // ignore quota/serialization errors
      }
    });
    return () => subscription.unsubscribe();
  }, [formContext, user?.sub]);

  return (
    <>
      <FormModal modalHook={[openModal, setOpenModal]} setActiveStep={setActiveStep} />
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" align="center">
          {isEditMode ? "Edit Transaction" : "Record New Transaction"}
        </Typography>
      </Box>
      <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
        {labels.map((label) => (
          <Step key={label}>
            <StepLabel>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormProvider {...formContext}>
        <ProvideBalance>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              {handleSteps(activeStep)}
            </FormGroup>
          </form>
        </ProvideBalance>
      </FormProvider>
      {/* <Button onClick={() => {setOpenModal((prev:boolean) => !prev)}}>Test Modal</Button> */}
    </>
  );
}