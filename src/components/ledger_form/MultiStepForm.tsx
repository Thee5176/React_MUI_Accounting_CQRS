import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import BalanceReview from "./BalanceReview";
import EntryForm from "./EntryForm";
import { formInitialValue, onSubmit, type LedgerEntry } from "./EntryForm/FormUtils";

const labels = ["Entry Form", "Balance Review"];

export default function MutiStepForm() {
    
    //stepper
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleSteps = (step: number) => {
      switch (step) {
        case 0:
          return <EntryForm setActiveStep={setActiveStep} />;
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
        }
    }, [reset, isSubmitSuccessful]);

    if (activeStep === labels.length) {
        redirect("/");
        return null;
    }

    return (
      <>
        <Box sx={{ my: 5 }}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              {handleSteps(activeStep)}
            </FormGroup>
          </form>
        </FormProvider>
      </>
    );
}