import { useTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import {
  ForgotPasswordLink,
  SignUpLink,
  SubmitButton,
  Subtitle,
  Title,
} from "../components/login/AuthenticationUtilities";
import EmailField from "../components/login/EmailField";
import PasswordField from "../components/login/PasswordField";
import RememberMeCheckbox from "../components/login/RememberMeCheckbox";
import { axiosQueryClient } from "../service/api";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function SlotsSignIn() {
  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={async (formData) => {
            const response = await axiosQueryClient.post("/api/v1/auth/login", formData);
            return response.data;
        }}
        slots={{
          title: Title,
          subtitle: Subtitle,
          emailField: EmailField,
          passwordField: PasswordField,
          submitButton: SubmitButton,
          signUpLink: SignUpLink,
          rememberMe: RememberMeCheckbox,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        slotProps={{ form: { noValidate: true } }}
        providers={providers}
      />
    </AppProvider>
  );
}