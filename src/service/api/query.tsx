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
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          console.log("Query : Token set to Authorize Header");
        }
        return config;
    });

    const responseQueryInterceptor = axiosQueryClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
      switch (error.response?.status) {
        case 403:
          resetCookies('token');
          window.location.href = "/auth/login";
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