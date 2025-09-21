import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { useContext, useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { BaseUrlContext } from "../../hooks/contexts/BaseUrlContext";


export interface CreateUser{
    username : string,
    password : string,
    firstname : string,
    lastname : string,

};

export default function SignUpForm(){ 
    // declare FormHook into Context
      const formContext = useForm<CreateUser>();
      
      // get FormHook from Context
      const {
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = formContext;
    
      // Send Data to Command Service
      const endpoint = useContext(BaseUrlContext);
      
      const postCreateUser = async (data: CreateUser) => {  
        const response = await fetch( endpoint.command + "/ledger", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await response.text();
      };
    
      const onSubmit: SubmitHandler<CreateUser> = async (data: CreateUser) => {    
    
        console.log(data);
        const result = await console.log(data);
        console.log(result);
      };
      // Reset form after submission
      useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            username: "",
            password: "",
            firstname: "",
            lastname: "",
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

                    <Button type="submit" variant="contained" sx={{ my : 2 }}>
                    Create Account
                    </Button>
                </FormGroup>
            </form>
        </FormProvider>
        </>
    )
}