import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export function SubmitButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Log In
    </Button>
  );
}

// TODO : add signup page

export function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Sign up
    </Link>
  );
}

// TODO : add forgot password page
export function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

export function Title() {
  return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

// TODO  API fetch error
export function Subtitle() {
  return (
    <Alert sx={{ mb: 2, px: 1, py: 0.25, width: "100%" }} severity="error">
      Error: Username and password do not match
    </Alert>
  );
}
