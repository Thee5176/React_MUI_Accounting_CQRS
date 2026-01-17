import { useAuth0 } from "@auth0/auth0-react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";

export interface ProtectedPathProps {
    readonly component:  React.ComponentType;
}

const LoadingComponent = () => (
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
);

export const ProtectedRoute = ({ component: Component }: ProtectedPathProps) => {
        const {isAuthenticated, isLoading, error} = useAuth0();
  
    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        console.error('Auth0 error', error);
        return <Navigate to="/login" replace />;
    }

    return isAuthenticated ? <Component /> : <Navigate to="/login" replace/>;
};
