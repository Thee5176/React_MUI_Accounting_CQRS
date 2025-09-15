import { useTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import axios from "axios";
import { useCookies } from "react-cookie";
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

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function SlotsSignIn() {
  const theme = useTheme();
  const [cookies, setCookie] = useCookies();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) =>
          axios({
            method: "POST",
            url: "/api/v1/auth/login",
            headers: { "Authorization" : cookies?.token},
            data: {
              username: provider.name,
              password: formData.get("password"),
            },
          })
          // TODO : fetch result flag and reder error message
          .then(
            (response) => {
              if (response.status === 200) {
                // TODO : redirect and  render sucessful notification
                setCookie("token", response.data.token);
              }
              throw new Error("Invalid credentials");
            }
          )
          .catch((error) => {
            throw new Error(error.response.data.message);
          })
        }
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