import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { axiosCommandClient } from ".";

//Config Command API Endpoint
export function AxiosCommandClientProvider({children}: {children: React.ReactNode}) {
  const [cookies, , ] = useCookies(['token']);
  
  useEffect(() => {
    const requestInterceptor = axiosCommandClient.interceptors.request.use((config) => {
      if (config.headers !== undefined) {
        const accessToken = cookies.token
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
      }
      return config;
      }
    )

    const responseInterceptor = axiosCommandClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        switch (error.response?.status) {
          case 403:
            window.location.href = '/auth/login'
            break;
          default:
            break;
        }
        return Promise.reject(error);
      }
    )

    return () => {
      axiosCommandClient.interceptors.request.eject(requestInterceptor)
      axiosCommandClient.interceptors.response.eject(responseInterceptor)
    }

  }, [cookies])
  
  return (<>{children}</>)
}