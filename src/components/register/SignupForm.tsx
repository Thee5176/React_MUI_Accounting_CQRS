import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useProvideAuth } from "../../hooks/auth";
import SetEmailField from "./EmailField";
import SetFirstNameField from "./FirstNameField";
import SetLastNameField from "./LastNameField";
import SetPasswordField from "./PasswordField";
import SetUserNameField from "./UserNameField";


export interface CreateUser{
  firstname : string,
  lastname : string,
  username : string,
  password : string,
  email   :string
};

export default function SignUpForm(){ 
      const {signup, authState, clearMessages} = useProvideAuth();
      const formContext = useForm<CreateUser>();

      const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
      } = formContext;
    
      const onSubmit: SubmitHandler<CreateUser> = async (data: CreateUser) => {
        clearMessages();
        await signup(data);
      };

      // Reset form after submission
      useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            email: ""
          });
        }
      }, [reset, isSubmitSuccessful]);
    
    return (
      <FormProvider  {...formContext}>
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
                  
                  <SetFirstNameField />
                  <SetLastNameField />
                  <SetUserNameField />
                  <SetPasswordField />
                  <SetEmailField />

                  <Box sx={{ position: 'relative' }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      sx={{ my: 2 }}
                      disabled={authState.isLoading}
                      fullWidth
                    >
                      {authState.isLoading ? 'Creating Account...' : 'Create Account'}
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
    )
}