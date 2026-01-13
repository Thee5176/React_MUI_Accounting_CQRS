import { withAuthenticationRequired } from "@auth0/auth0-react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export interface ProtectedRouteProps {
    component: React.ComponentType<any>;
}

const LoadingComponent = () => (
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
);

export const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: LoadingComponent,
    });
    
    return <Component />;
};
