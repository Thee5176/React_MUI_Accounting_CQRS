import { createContext } from "react";

const CommandPath = "http://" + import.meta.env.VITE_HOST_IP + ':' + import.meta.env.VITE_COMMAND_PORT;
const QueryPath = "http://" + import.meta.env.VITE_HOST_IP + ":" + import.meta.env.VITE_QUERY_PORT;

export const BaseUrlContext = createContext(
    {command : CommandPath, query : QueryPath}
);