import { useMemo, useState } from "react";
import { Ctx } from "./context";

export function StepperProvider({
  total = 2,
  initialStep = 0,
  children,
}: {
  total: number;
  initialStep?: number;
  children: React.ReactNode;
}) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
      next: () => setActiveStep((s) => Math.min(s + 1, total - 1)),
      back: () => setActiveStep((s) => Math.max(s - 1, 0)),
      reset: () => setActiveStep(0),
      total,
    }),
    [activeStep, total]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}