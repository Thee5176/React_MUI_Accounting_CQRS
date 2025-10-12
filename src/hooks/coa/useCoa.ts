import { useContext } from "react";
import { CoaContext } from "./context";


export const useCoa = () => {
    return useContext(CoaContext);
}