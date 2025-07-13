// src/theme.js

import { createTheme } from '@mui/material/styles';

// A new, modern and vibrant color palette
const palette = {
  primary: {
    main: '#00796B', // A deep teal
    light: '#48A999',
    dark: '#004D40',
  },
  secondary: {
    main: '#536DFE', // A vibrant indigo
    light: '#7C8CFF',
    dark: '#3F51B5',
  },
  background: {
    default: '#ECEFF1', // A slightly cooler, very light grey
    paper: '#ffffff',
  },
  text: {
    primary: '#263238',
    secondary: '#546E7A',
  },
  success: {
    main: '#2E7D32',
  },
  warning: {
    main: '#ED6C02',
  }
};

const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: palette.text.primary,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: '600',
      borderRadius: 8,
    },
  },
  components: {
    // Adding a gradient to the AppBar
   MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(45deg, ${palette.primary.dark} 0%, ${palette.primary.main} 100%)`,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 1,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: palette.primary.dark,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: palette.primary.main,
            },
          },
        },
      },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontWeight: '600'
            }
        }
    }
  },
});

export default theme;