import { createContext } from "react";

const host = import.meta.env.VITE_HOST_IP;

export const COMMAND_PATH: string = `http://${host}:8181`;
export const QUERY_PATH: string = `http://${host}:8182`;

export const BaseUrlContext = createContext(
    {command : COMMAND_PATH, query : QUERY_PATH}
);