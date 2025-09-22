import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { axiosCommandClient } from "../../service/api";
import SetEmailField from "./REmailField";
import SetFirstNameField from "./RFirstNameField";
import SetLastNameField from "./RLastNameField";
import SetPasswordField from "./RPasswordField";


export interface CreateUser{
  firstname : string,
  lastname : string,
  username : string,
  password : string,

};

export default function SignUpForm(){ 
    // declare FormHook into Context
      const formContext = useForm<CreateUser>();
      
      // get FormHook from Context
      const {
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitSuccessful },
      } = formContext;
    
      const postCreateUser = async (data: CreateUser) => {  
        return await axiosCommandClient.post('/api/auth/v1/register', data)
      };
    
      const onSubmit: SubmitHandler<CreateUser> = async (data: CreateUser) => {
        console.log(data);
        const result = await postCreateUser(data)
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
          });
        }
      }, [reset, isSubmitSuccessful]);
    
      console.log(watch());
    
    return (
        <>
        <Typography variant="h1">Register Account</Typography>
        <FormProvider  {...formContext}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <SetFirstNameField />
                    <SetLastNameField />
                    <SetEmailField />
                    <SetPasswordField />

                    <Button type="submit" variant="contained" sx={{ my : 2 }}>
                    Create Account
                    </Button>
                </FormGroup>
            </form>
        </FormProvider>
        </>
    )
}