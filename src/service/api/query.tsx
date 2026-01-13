import { useAuth0 } from "@auth0/auth0-react";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosQueryClient } from ".";

//Config Query API Endpoint
export function AxiosQueryClientProvider({children}: {readonly children: React.ReactNode}) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    
  useEffect(() => {
      const requestQueryInterceptor = axiosQueryClient.interceptors.request.use(async (config) => {
            if (isAuthenticated) {
              const token = await getAccessTokenSilently();
              console.log("Query Token:", token);
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
                    break;
                  case 403:
                    console.log("Forbidden: Access denied"); //Message
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
      
        }, [isAuthenticated, getAccessTokenSilently])

  return(<>{children}</>);
}