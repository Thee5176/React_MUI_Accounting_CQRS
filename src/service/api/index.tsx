import axios from "axios";

// Resolve host from runtime injection first, then Vite build-time env (must be prefixed with VITE_), finally fallback to localhost.
const host = globalThis.location.origin;
console.log("API Host IP (resolved):", host);

const COMMAND_PATH: string = `http://${host}:8181`;
const QUERY_PATH: string = `http://${host}:8182`;

const axiosClient = (endpoint:string) => axios.create({
    baseURL: endpoint == "command" ? COMMAND_PATH : QUERY_PATH,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export function setAuthToken(token?: string | null) {
    const header = `Bearer ${token}`;
    axios.defaults.headers.common["Authorization"] = header;
    axiosCommandClient.defaults.headers.common["Authorization"] = header;
    axiosQueryClient.defaults.headers.common["Authorization"] = header;
}

export const axiosCommandClient = axiosClient("command");
export const axiosQueryClient = axiosClient("query");