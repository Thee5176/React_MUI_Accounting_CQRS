import { createContext } from "react";
import useProvideCoa from ".";

export const CoaContext = createContext<ReturnType<typeof useProvideCoa> | null>(null);