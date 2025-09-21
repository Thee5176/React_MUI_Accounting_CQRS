import axios from "axios";
import { COMMAND_PATH, QUERY_PATH } from "../../hooks/contexts/BaseUrlContext";


const axiosClient = ( endpoint:string) => axios.create({
    baseURL: endpoint == "command" ? COMMAND_PATH : QUERY_PATH,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const axiosCommandClient = axiosClient("command");
export const axiosQueryClient = axiosClient("query");