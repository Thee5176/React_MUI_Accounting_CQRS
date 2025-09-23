import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl"; // Add this import
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel"; // Add this import
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function SetPasswordField() {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Controller
      name="password" 
      control={control}
      render={({field}) => (
        <FormControl variant="outlined">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput {...field}
            id="password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="inherit" />
                  ) : (
                    <Visibility fontSize="inherit" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    />
  );
}
