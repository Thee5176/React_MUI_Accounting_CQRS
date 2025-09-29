import { useCookies } from "react-cookie";
import type { LoginUser } from "../../components/login/LoginForm";
import { axiosQueryClient, setAuthToken } from "../../service/api";

export interface AuthData {
    username: string;
    password: string;
}

export interface AuthToken {
    token: string;
}

export function useProvideAuth() {
    // Custom hook to check authentication token and handle redirection
    const [cookies, SetCookies, removeCookies] = useCookies<'token', AuthToken>(['token']);

    const logout = () => {
        // Remove Authentication Credential
        removeCookies("token", { path: "/" });
        setAuthToken(null);
        window.location.href = '/auth/login';
    };
    
    const login = async (data?: LoginUser) => {
        if (cookies.token) {
            window.location.href = "/"
        }
        if (data){
            const response = await axiosQueryClient.post("/api/v1/auth/login", data);
            const token = response.data?.token || "";

            SetCookies('token', token, {path: "/"});
            setAuthToken(token);
            window.location.href = "/";
        } else {
            window.location.href = "/auth/login";
        }
    };

    const signup = async (data: AuthData) => {
        if (cookies.token) {
            window.location.href = "/"
        }
        await axiosQueryClient.post("/api/v1/auth/signup", data);
        
        window.location.href = "/auth/login";
    };

    return {logout, login, signup}
};
