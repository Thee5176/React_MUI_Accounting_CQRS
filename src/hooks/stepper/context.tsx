import { createContext } from "react";

type StepperCtx = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  next: () => void;
  back: () => void;
  reset: () => void;
  total: number;
};

export const Ctx = createContext<StepperCtx | null>(null);