import { useContext } from "react";
import { OutstandingContext } from "./context";

export const useOutstanding = () => {
  const ctx = useContext(OutstandingContext);
  if (!ctx) throw new Error("useOutstanding must be used within ProvideOutstanding");

  return ctx;
}
