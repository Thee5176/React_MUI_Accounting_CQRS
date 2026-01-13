import { createContext } from "react";
import type { useProvideOutstanding } from ".";

export const OutstandingContext = createContext<ReturnType<typeof useProvideOutstanding> | null>(null);