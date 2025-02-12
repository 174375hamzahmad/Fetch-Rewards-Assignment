// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',  // Blue
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
