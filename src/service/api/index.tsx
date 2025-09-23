import axios from "axios";

const host = import.meta.env.VITE_HOST_IP;

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