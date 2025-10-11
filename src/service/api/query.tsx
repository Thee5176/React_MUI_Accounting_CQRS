import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { axiosQueryClient } from ".";

//Config Query API Endpoint
export function AxiosQueryClientProvider({children}: {children: React.ReactNode}) {
  const [cookies, , resetCookies] = useCookies(['token']);
  
  useEffect(() => {
      const requestQueryInterceptor = axiosQueryClient.interceptors.request.use((config) => {
        const accessToken = cookies.token;
        console.log("Query Request - Token available:", !!accessToken);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          console.log("Query : Token set to Authorize Header", config.headers.Authorization?.substring(0, 20) + "...");
        } else {
          console.log("Query : No token available for authorization");
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

  }, [cookies, resetCookies]);

  return(<>{children}</>);
}