import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosQueryClient } from ".";

//Config Query API Endpoint
export function AxiosQueryClientProvider({children}: {children: React.ReactNode}) {
  useEffect (() => {
    //Config Query API Endpoint
    const requestQueryInterceptor = axiosQueryClient.interceptors.request.use((config) => {
        if (config.headers !== undefined) {
          // ヘッダにアクセストークンを埋める
          // const accessToken = getAccessToken()
          // if (accessToken) {
          //   config.headers.Authorization = `Bearer ${accessToken}`
          // }
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
          // 401の場合はログイン画面にリダイレクト
          // window.location.href = '/login'
          break
        default:
          break
      }
      return Promise.reject(error);
    });

  return () => {
    axiosQueryClient.interceptors.request.eject(requestQueryInterceptor)
    axiosQueryClient.interceptors.response.eject(responseQueryInterceptor)
  }

  }, []);

  return(<>{children}</>);
}