import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { axiosCommandClient } from "../../service/api";

interface AuthData {
    username: string;
    password: string;
}

const UserContext = createContext('auth');

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

  const login = async ({ username, password}: AuthData) => {
    const res = await axiosCommandClient.post("/api/v1/auth/login", {
      username: username,
      password: password,
    });

    setCookies("token", res.data.token); // your token
    setCookies("name", res.data.name); // optional data

    navigate("/home");
  };

  const logout = () => {
    ["token", "name"].forEach((obj) => removeCookie(obj)); // remove data save in cookies
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
    }),
    [cookies]
  );

  return (
    <>{children}
    </>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};