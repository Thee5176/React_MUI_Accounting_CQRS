import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosCommandClient } from ".";

//Config Command API Endpoint
export function AxiosCommandClientProvider({children}: {children: React.ReactNode}) {
  useEffect(() => {
    const requestInterceptor = axiosCommandClient.interceptors.request.use((config) => {
      if (config.headers !== undefined) {
        // ヘッダにアクセストークンを埋める
        // const accessToken = getAccessToken()
        // if (accessToken) {
        //   config.headers.Authorization = `Bearer ${accessToken}`
        // }
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
          case 401:
            // 401の場合はログイン画面にリダイレクト
            // window.location.href = '/login'
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

  }, [])
  
  return (<>{children}</>)
}