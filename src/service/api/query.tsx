import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { axiosQueryClient } from ".";

//Config Query API Endpoint
export function AxiosQueryClientProvider({children}: {children: React.ReactNode}) {
  const [cookies, , resetCookies] = useCookies(['token']);
  
  useEffect (() => {
    //Config Query API Endpoint
    const requestQueryInterceptor = axiosQueryClient.interceptors.request.use((config) => {
        const accessToken = cookies.token;
        // Reduce console logging to prevent spam
        if (config.url?.includes('/api/ledgers/all')) {
          console.log("Query Request - Ledgers API - Token available:", !!accessToken);
        }
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    const responseQueryInterceptor = axiosQueryClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
      switch (error.response?.status) {
        case 401:
          console.log("Unauthorized: Token invalid or expired");
          resetCookies('token');
          window.location.href = '/auth/login';
          break;
        case 403: //Error Page: manage by backend
          console.log("Forbidden: Access denied");
          resetCookies('token');
          break;
        
        default:
          break;
      }
      return Promise.reject(error);
    });

  return () => {
    axiosQueryClient.interceptors.request.eject(requestQueryInterceptor)
    axiosQueryClient.interceptors.response.eject(responseQueryInterceptor)
  }

  }, [cookies.token, resetCookies]);

  return(<>{children}</>);
}