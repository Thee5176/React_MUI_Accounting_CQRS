import Button from "@mui/material/Button";
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
      const {signup} = useProvideAuth();
      const formContext = useForm<CreateUser>();

      const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
      } = formContext;
    
      const onSubmit: SubmitHandler<CreateUser> = async (data: CreateUser) => {
        const result = await signup(data);
        console.log(data);
        console.log(result);
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
                  <SetFirstNameField />
                  <SetLastNameField />
                  <SetUserNameField />
                  <SetPasswordField />
                  <SetEmailField />

                  <Button type="submit" variant="contained" sx={{ my : 2 }}>
                  Create Account
                  </Button>
              </FormGroup>
          </form>
      </FormProvider>
    )
}