import { useContext } from "react";
import { Ctx } from "./context";

export function useStepper() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStepper must be used within StepperProvider");
  return ctx;
}
