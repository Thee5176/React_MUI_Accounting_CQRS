import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AxiosCommandClientProvider } from "./service/api/command";
import { AxiosQueryClientProvider } from "./service/api/query";
import theme from "./styles/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AxiosCommandClientProvider>
      <AxiosQueryClientProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AxiosQueryClientProvider>
    </AxiosCommandClientProvider>
  </StrictMode>
);
