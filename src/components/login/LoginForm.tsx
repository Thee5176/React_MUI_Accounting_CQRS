import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useProvideAuth } from "../../hooks/auth";
import SetPasswordField from "../register/PasswordField";
import SetUserNameField from "../register/UserNameField";
import RememberMeCheckbox from "./RememberMeCheckbox";

export interface LoginUser {
  username: string;
  password: string;
}

export default function LoginForm() {
    const {login, authState, clearMessages} = useProvideAuth();
    const formContext = useForm<LoginUser>();
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = formContext;

    const onSubmit: SubmitHandler<LoginUser> = async (data: LoginUser) => {
      clearMessages();
      await login(data);
    };

    // Reset form after submission
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset({
        username: "",
        password: ""
        });
    }
    }, [reset, isSubmitSuccessful]);
    
    return (
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            {authState.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {authState.error}
              </Alert>
            )}
            {authState.success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {authState.success}
              </Alert>
            )}
            
            <SetUserNameField />
            <SetPasswordField />

            <RememberMeCheckbox/>

            <Box sx={{ position: 'relative' }}>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ my: 2 }}
                disabled={authState.isLoading}
                fullWidth
              >
                {authState.isLoading ? 'Logging in...' : 'Login'}
              </Button>
              {authState.isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </FormGroup>
        </form>
      </FormProvider>
    );
};