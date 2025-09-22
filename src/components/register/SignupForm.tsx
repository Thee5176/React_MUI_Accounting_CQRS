import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { axiosQueryClient } from "../../service/api";
import SetEmailField from "./REmailField";
import SetFirstNameField from "./RFirstNameField";
import SetLastNameField from "./RLastNameField";
import SetPasswordField from "./RPasswordField";
import SetUserNameField from "./RUserNameField";


export interface CreateUser{
  firstname : string,
  lastname : string,
  username : string,
  password : string,
  email   :string
};

export default function SignUpForm(){ 
      const [, SetCookies, ] = useCookies(['token']);
      const formContext = useForm<CreateUser>();
      
      const {
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
      } = formContext;
    
      const postCreateUser = async (data: CreateUser) => {  
        const response = await axiosQueryClient.post('/api/v1/auth/register', data);
        return response.data;
      };
    
      const onSubmit: SubmitHandler<CreateUser> = async (data: CreateUser) => {
        const result = await postCreateUser(data);
        SetCookies('token', result.token, { path: '/' });
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
        <>
        <Typography variant="h1">Register Account</Typography>
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
        </>
    )
}