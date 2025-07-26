import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9C27B0',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#EF6C00',
      dark: '#E65100',
    },
    info: {
      main: '#0288D1',
    },
    success: {
      main: '#2E7D32',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
    },
    common: {
      white: '#FFFFFF',
    },
    action: {
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily : 'roboto'
  }
});

export default theme;