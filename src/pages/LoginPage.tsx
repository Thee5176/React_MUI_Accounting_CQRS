import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import AuthLayout from "../layout/user";

export default function SlotsSignIn() {

  return (
    <AuthLayout >
      <Typography variant="h3" sx={{alignSelf: "center", mb: 2}}>Login</Typography>
      <LoginForm />
      <Link to="/auth/register">Create New Account</Link>
    </AuthLayout>
  );
}
