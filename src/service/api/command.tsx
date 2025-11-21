import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosCommandClient } from ".";
import { useAuth } from "../../hooks/auth/useAuth";

//Config Command API Endpoint
export function AxiosCommandClientProvider({children}: {readonly children: React.ReactNode}) {
  const { isAuthenticated, token, logout } = useAuth();

  useEffect(() => {
    const requestCommandInterceptor = axiosCommandClient.interceptors.request.use((config) => {
      if (isAuthenticated) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("Command : No token available for authorization"); //Message
      }
      return config;
      }
    )

    const responseCommandInterceptor = axiosCommandClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
          switch (error.response?.status) {
            case 401:
              console.log("Unauthorized: Token invalid or expired"); //Message
              logout();
              break;
            case 403:
              console.log("Forbidden: Access denied"); //Message
              logout();
              break;

            default:
              break;
          }
        return Promise.reject(error);
      }
    )

    return () => {
      axiosCommandClient.interceptors.request.eject(requestCommandInterceptor)
      axiosCommandClient.interceptors.response.eject(responseCommandInterceptor)
    }

  }, [isAuthenticated, token, logout])
  
  return (<>{children}</>)
}