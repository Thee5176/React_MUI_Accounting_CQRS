import { useContext } from "react";
import { authContext } from "./context";

/**
 * @deprecated Use the `useAuth0` hook from librarys instead.
 */
export const useAuth = () => {
    const ctx = useContext(authContext);
    if (!ctx) throw new Error("useAuth must be used within ProvideAuth");
    return ctx;
};