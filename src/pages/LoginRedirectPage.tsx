import { useAuth0 } from "@auth0/auth0-react";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import AuthLayout from "../layout/user";

export default function LoginRedirectPage() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    
  useEffect(() => {
      if (!isLoading && !isAuthenticated) {
          loginWithRedirect();
      }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return (
    <AuthLayout >
      <Typography variant="h3" sx={{alignSelf: "center", mb: 2}}>Redirect to Auth0...</Typography>
    </AuthLayout>
  );
}