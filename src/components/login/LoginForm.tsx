import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useProvideAuth } from "../../hooks/auth";
import SetPasswordField from "../register/PasswordField";
import type { CreateUser } from "../register/SignupForm";
import SetUserNameField from "../register/UserNameField";
import RememberMeCheckbox from "./RememberMeCheckbox";

export interface LoginUser {
  username: string;
  password: string;
}

export default function LoginForm() {
    const {login} = useProvideAuth();
    const formContext = useForm<CreateUser>();
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = formContext;

    const onSubmit: SubmitHandler<CreateUser> = async (data: CreateUser) => {
      const result = await login(data);
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
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <SetUserNameField />
            <SetPasswordField />

            <RememberMeCheckbox/>

            <Button type="submit" variant="contained" sx={{ my: 2 }}>
              Login
            </Button>
          </FormGroup>
        </form>
      </FormProvider>
    );
};