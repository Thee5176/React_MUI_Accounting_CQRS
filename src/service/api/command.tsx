import { useAuth0 } from "@auth0/auth0-react";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosCommandClient } from ".";

//Config Command API Endpoint
export function AxiosCommandClientProvider({children}: {readonly children: React.ReactNode}) {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const requestCommandInterceptor = axiosCommandClient.interceptors.request.use(async (config) => {
      if (isAuthenticated && !isLoading) {
        try {
          const token = await getAccessTokenSilently({ 
            timeoutInSeconds: 10 
          });
          console.log("Command Token:", token);
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error("Command: Failed to get token", error);
          throw new Error("Failed to acquire Auth0 token");
        }
      } else if (isLoading) {
        console.log("Command: Auth0 is still loading, deferring request");
        throw new Error("Auth0 is still initializing");
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
      axiosCommandClient.interceptors.request.eject(requestCommandInterceptor)
      axiosCommandClient.interceptors.response.eject(responseCommandInterceptor)
    }

  }, [isAuthenticated, isLoading, getAccessTokenSilently])
  
  return (<>{children}</>)
}