import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosQueryClient } from ".";
import { useAuth } from "../../hooks/auth/useAuth";

//Config Query API Endpoint
export function AxiosQueryClientProvider({children}: {readonly children: React.ReactNode}) {
  const { isAuthenticated, token, logout } = useAuth();
    
  useEffect(() => {
      const requestQueryInterceptor = axiosQueryClient.interceptors.request.use((config) => {
            if (isAuthenticated) {
              config.headers.Authorization = `Bearer ${token}`;
            } else {
              console.log("Query : No token available for authorization"); //Message
            }
            return config;
            }
          )
      
          const responseQueryInterceptor = axiosQueryClient.interceptors.response.use(
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
            axiosQueryClient.interceptors.request.eject(requestQueryInterceptor)
            axiosQueryClient.interceptors.response.eject(responseQueryInterceptor)
          }
      
        }, [isAuthenticated, token, logout])

  return(<>{children}</>);
}