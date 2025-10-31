import { useContext } from "react";
import { authContext } from "./context";

export const useAuth = () => {
    const ctx = useContext(authContext);
    if (!ctx) throw new Error("useAuth must be used within ProvideAuth");
    return ctx;
};