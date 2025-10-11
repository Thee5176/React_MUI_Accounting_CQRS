import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { axiosCommandClient } from ".";

//Config Command API Endpoint
export function AxiosCommandClientProvider({children}: {children: React.ReactNode}) {
  const [cookies, , resetCookies] = useCookies(['token']);

  useEffect(() => {
    const requestCommandInterceptor = axiosCommandClient.interceptors.request.use((config) => {
      const accessToken = cookies.token;
      console.log("Command Request - Token available:", !!accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log("Command : Token set to Authorize Header", config.headers.Authorization?.substring(0, 20) + "...");
      } else {
        console.log("Command : No token available for authorization");
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
            console.log("Unauthorized: Token invalid or expired");
            resetCookies('token');
            window.location.href = '/auth/login';
            break;
          case 403:
            console.log("Forbidden: Access denied");
            resetCookies('token');
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

  }, [cookies, resetCookies])
  
  return (<>{children}</>)
}