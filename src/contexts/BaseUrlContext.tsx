import { createContext } from "react";

const runtime = (window as any).__env || {};
const host = runtime.VITE_HOST_IP || import.meta.env.VITE_HOST_IP;

const CommandPath = `http://${host}:8181`;
const QueryPath = `http://${host}:8182`;
export const BaseUrlContext = createContext(
    {command : CommandPath, query : QueryPath}
);