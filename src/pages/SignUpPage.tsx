import { useTheme } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import SignUpForm from "../components/register/SignupForm";

export default function SignUpPage() {
    const theme = useTheme();

    return (
        <AppProvider theme={theme}>
            <SignUpForm/>
        </AppProvider>
    )
}