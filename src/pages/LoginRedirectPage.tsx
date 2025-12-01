import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
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
      <Typography sx={{alignSelf: "center", mb: 2}}  variant="h4">Log in via SSO service</Typography>
      <Button sx={{alignSelf: "center", mb: 2}} onClick={handleClick} variant="contained">Redirect to Auth0</Button>
    </AuthLayout>
  );
}