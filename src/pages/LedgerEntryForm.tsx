import MutiStepForm from "../components/ledger_form/MultiStepForm";
import { ProvideStepper } from "../hooks/stepper/provider";

export default function LedgerEntryForm() {
  // declare FormHook into Context

  return (
    <>
      <ProvideStepper>
        <MutiStepForm />
      </ProvideStepper>
    </>
  );
}
