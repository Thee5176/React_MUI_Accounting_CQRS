import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { axiosCommandClient } from "../../service/api";
import EmailField from "../login/EmailField";
import PasswordField from "../login/PasswordField";
import FirstNameField from "./FirstNameField";
import LastNameField from "./LastNameField";


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
        return await axiosCommandClient.post('/auth/v1/login', data)
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

                    <FirstNameField />
                    <LastNameField />
                    <EmailField />
                    <PasswordField />

                    <Button type="submit" variant="contained" sx={{ my : 2 }}>
                    Create Account
                    </Button>
                </FormGroup>
            </form>
        </FormProvider>
        </>
    )
}