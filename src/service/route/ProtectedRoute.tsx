import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export interface ProtectedPathProps {
    children: React.ReactElement;
    redirectPath?: string;
}

export default function ProtectedRoute({ children, redirectPath="/auth/login" } : ProtectedPathProps) {
    const [cookies, , ] = useCookies(['token']);
  
    if (!cookies.token) {
        return <Navigate to={redirectPath} replace/>;
    }

  return children;
};
