import { useCookies } from "react-cookie";
import type { LoginUser } from "../../components/login/LoginForm";
import { axiosCommandClient, setAuthToken } from "../../service/api";

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
        console.log("Login attempt with data:", data);
        if (data) {
            try {
                const response = await axiosCommandClient.post("/api/v1/auth/login", data);
                const token = response.data?.token || "";

                SetCookies('token', token, {path: "/"});
                setAuthToken(token);
                console.log("Login successful, redirecting...");
            } catch (error) {
                console.error("Login failed:", error);
                // Handle login error (show message to user)
            }
        } else {
            window.location.href = "/auth/login";
        }
    };

    const signup = async (data: AuthData) => {
        if (cookies.token) {
            window.location.href = "/"
        }
        console.log("Signup attempt with data:", data);
        try {
            await axiosCommandClient.post("/api/v1/auth/register", data);
            console.log("Signup successful, redirecting to login...");
        } catch (error) {
            console.error("Signup failed:", error);
            // Handle signup error (show message to user)
        }
    };

    return {logout, login, signup}
};
