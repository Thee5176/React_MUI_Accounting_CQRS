import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { axiosCommandClient } from "../../service/api";

export const useLogout = () => {
    const [, , removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const logout = () => {
        removeCookie('token');
        navigate('/auth/login');
    }
    return logout;
}

export const useLogin = () => {
    const [, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const login = (token: string) => {
        setCookie('token', token, { path: '/' });
        navigate('/');
    }
    return login;
}

export const useAuth = () => {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();
    if (cookies.token) {
        axiosCommandClient.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;
        return true;
    } else {
        console.log('access token not found')
        navigate('/auth/login');
    }
}