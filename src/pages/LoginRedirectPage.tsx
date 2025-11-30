import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import AuthLayout from "../layout/user";

export default function LoginRedirectPage() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    
  const handleClick = () => {
      if (!isLoading && !isAuthenticated) {
          loginWithRedirect();
      }
  };

  return (
    <AuthLayout >
      <Button sx={{alignSelf: "center", mb: 2}} onClick={handleClick}>Redirect to Auth0</Button>
    </AuthLayout>
  );
}