import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProvideBalance from "../../hooks/balance/provider";
import useStepper from "../../hooks/stepper/useStepper";
import BalanceReview from "./BalanceReview";
import EntryForm from "./EntryForm";
import { formInitialValue, onSubmit, type LedgerEntry } from "./EntryForm/FormUtils";
import FormModal from "./FormModal";

const labels = ["Entry Form", "Balance Review"];

export default function MutiStepForm() {
    //stepper
    const { activeStep, setActiveStep } = useStepper();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleSteps = (step: number) => {
      switch (step) {
        case 0:
          return <EntryForm />;
        case 1:
          return <BalanceReview setActiveStep={setActiveStep} />;
        default:
          throw new Error("Unknown step");
      }
    };

    //form
    const formContext = useForm<LedgerEntry>({
      defaultValues: formInitialValue,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = formContext;

    // Reset form after submission
    useEffect(() => {
        if (isSubmitSuccessful) {
          reset(formInitialValue);
          setOpenModal(true);
        }
    }, [reset, isSubmitSuccessful]);

    return (
      <>
        <FormModal modalHook={[openModal, setOpenModal]} setActiveStep={setActiveStep} />
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" align="center">
            Record New Transaction
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
      </>
    );
}