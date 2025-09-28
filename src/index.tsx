import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./styles/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <ThemeProvider theme={theme}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
        </ThemeProvider>
  </StrictMode>
);
