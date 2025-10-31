import axios from "axios";

// Type for runtime config
interface RuntimeConfig {
  VITE_HOST_IP?: string;
  VITE_COMMAND_PORT?: string;
  VITE_QUERY_PORT?: string;
}

// Fallback to window object for runtime config or use build-time env
const host =
  import.meta.env.VITE_HOST_IP ||
  (window as RuntimeConfig).VITE_HOST_IP ||
  "13.112.10.169";

const COMMAND_PATH: string = `http://${host}:8181`;
const QUERY_PATH: string = `http://${host}:8182`;

const axiosClient = ( endpoint:string) => axios.create({
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