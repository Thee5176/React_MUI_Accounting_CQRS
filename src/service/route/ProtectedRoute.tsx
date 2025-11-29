import { useAuth0 } from "@auth0/auth0-react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";

export interface ProtectedPathProps {
    readonly children:  React.ReactElement;
    readonly redirectPath?: string;
}

export default function ProtectedRoute({ children, redirectPath="/authentication" } : ProtectedPathProps) {
    const {isAuthenticated, isLoading, error} = useAuth0();
  
    if (isLoading) {
        return (
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={true}>
            <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (error) {
        console.error('Auth0 error', error);
        return <Navigate to={redirectPath} replace />;
    }

    return isAuthenticated ? children : <Navigate to={redirectPath} replace/>;
};
