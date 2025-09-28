import { createContext } from "react";
import { useProvideAuth } from ".";

export const authContext = createContext<ReturnType<typeof useProvideAuth> | null>(null);