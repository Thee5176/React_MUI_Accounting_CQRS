import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import SignUpForm from "../components/register/SignupForm";
import AuthLayout from "../layout/user";

export default function SignUpPage() {

    return (
      <AuthLayout>
        <Typography variant="h3" sx={{ alignSelf: "center", mb: 2 }}>
          RegisterAccount
        </Typography>
        <SignUpForm />
        <Link to="/auth/login">or login</Link>
      </AuthLayout>
    );
}