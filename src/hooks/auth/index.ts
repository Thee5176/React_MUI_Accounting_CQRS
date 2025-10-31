import { useState } from "react";
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

export interface AuthState {
    isLoading: boolean;
    error: string | null;
    success: string | null;
}

export function useProvideAuth() {
    // Custom hook to check authentication token and handle redirection
    const [cookies, SetCookies, removeCookies] = useCookies<'token', AuthToken>(['token']);
    const [authState, setAuthState] = useState<AuthState>({
        isLoading: false,
        error: null,
        success: null
    });

    const isAuthenticated = Boolean(cookies.token);

    const logout = () => {
        // Remove Authentication Credential
        removeCookies("token", { path: "/" });
        setAuthToken(null);
        window.location.href = '/auth/login';
    };
    
    const login = async (data?: LoginUser) => {
        if (isAuthenticated) {
            window.location.href = "/"
            return;
        }
        
        if (data) {
            setAuthState({ isLoading: true, error: null, success: null });
            try {
                const response = await axiosCommandClient.post("/api/v1/auth/login", data);
                const token = response.data?.token || "";

                if (token) {
                    SetCookies('token', token, {path: "/"});
                    setAuthToken(token);
                    setAuthState({ isLoading: false, error: null, success: "Login successful! Redirecting..." });
                    setTimeout(() => window.location.href = "/", 1000);
                } else {
                    setAuthState({ isLoading: false, error: "Login failed: No token received", success: null });
                }
            } catch (error: unknown) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : (error as { response?: { data?: { message?: string } } })?.response?.data?.message 
                    || "Login failed. Please try again.";
                setAuthState({ isLoading: false, error: errorMessage, success: null });
            }
        } else {
            window.location.href = "/auth/login";
        }
    };

    const signup = async (data: AuthData) => {
        if (isAuthenticated) {
            window.location.href = "/"
            return;
        }
        
        setAuthState({ isLoading: true, error: null, success: null });
        try {
            await axiosCommandClient.post("/api/v1/auth/register", data);
            setAuthState({ isLoading: false, error: null, success: "Account created successfully! Redirecting to login..." });
            setTimeout(() => window.location.href = "/auth/login", 1000);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : (error as { response?: { data?: { message?: string } } })?.response?.data?.message 
                || "Registration failed. Please try again.";
            setAuthState({ isLoading: false, error: errorMessage, success: null });
        }
    };

    const clearMessages = () => {
        setAuthState(prev => ({ ...prev, error: null, success: null }));
    };

    return { logout, login, signup, authState, clearMessages, isAuthenticated, token: cookies.token };
};
