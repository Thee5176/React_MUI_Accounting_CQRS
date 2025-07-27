import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import theme from './styles/theme.tsx'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < ThemeProvider theme={ theme }>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
