import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { useProvideAuth } from ".";
import { setAuthToken } from "../../service/api";
import { authContext } from "./context";

export default function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  // Prime axios defaults synchronously before children effects run
  useLayoutEffect(() => {
    setAuthToken(auth.token ?? null);
  }, [auth.token]);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}