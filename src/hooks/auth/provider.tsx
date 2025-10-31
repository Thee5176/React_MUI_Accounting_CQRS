import type { ReactNode } from "react";
import { authContext } from "./context";
import { useProvideAuth } from ".";

export default function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}