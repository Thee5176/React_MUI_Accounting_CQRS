import axios from "axios";

// Type for runtime config
interface RuntimeConfig {
  REACT_APP_HOST_IP?: string;
  REACT_APP_COMMAND_PORT?: string;
  REACT_APP_QUERY_PORT?: string;
}

// Fallback to window object for runtime config or use build-time env
const host = import.meta.env.VITE_HOST_IP || (window as RuntimeConfig).REACT_APP_HOST_IP || 'localhost';

const COMMAND_PATH: string = `http://${host}:8181`;
const QUERY_PATH: string = `http://${host}:8182`;

const axiosClient = ( endpoint:string) => axios.create({
    baseURL: endpoint == "command" ? COMMAND_PATH : QUERY_PATH,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export function setAuthToken(token?: string | null) {
  if (token) {
    const header = `Bearer ${token}`;
    axios.defaults.headers.common["Authorization"] = header;
    axiosCommandClient.defaults.headers.common["Authorization"] = header;
    axiosQueryClient.defaults.headers.common["Authorization"] = header;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete axiosCommandClient.defaults.headers.common["Authorization"];
    delete axiosQueryClient.defaults.headers.common["Authorization"];
  }
}

export const axiosCommandClient = axiosClient("command");
export const axiosQueryClient = axiosClient("query");