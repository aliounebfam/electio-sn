import React from 'react'
import ReactDOM from 'react-dom/client'
import ReloadPrompt from './utils/ReloadPwaPrompt';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { router } from './Routes';
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';


//theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3000}>
          <RouterProvider router={router} />
          <ReloadPrompt />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
