import { useContext } from "react";
import { StepperContext } from "./context";

// TODO: to be implemented

export default function useStepper() {
  const stepper = useContext(StepperContext);
  if (!stepper) throw new Error("useStepper must be used within StepperProvider");

  return stepper;
}
