import axios from "axios";
import { createContext } from "react";

const runtime = (window as any).__env || {};
const host = runtime.VITE_HOST_IP || import.meta.env.VITE_HOST_IP;

const COMMAND_PATH : string = `http://${host}:8181`;
const QUERY_PATH : string = `http://${host}:8182`;

axios.defaults.baseURL = COMMAND_PATH;


export const BaseUrlContext = createContext(
    {command : COMMAND_PATH, query : QUERY_PATH}
);