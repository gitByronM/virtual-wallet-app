import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import WalletPage from './components/pages/WalletPage';
import { CustomerProvider } from './context/CustomerContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
    palette: {
      background: {
        default: '#f2f5f7',
      },
      primary: {
        main: '#00b9ff', // Wise primary blue color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CustomerProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 5000,
            style: {
              background: '#ffffff',
              color: '#2e4369',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              fontSize: '14px',
              maxWidth: '350px',
            },
            success: {
              iconTheme: {
                primary: '#00b9ff',
                secondary: '#ffffff',
              },
              style: {
                border: '1px solid #00b9ff',
              },
            }
          }}
        />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage isSignUp={false}/>} />
            <Route path="/sign-up" element={<LoginPage isSignUp={true}/>} />
            <Route path="/wallet" element={<WalletPage />} />
          </Routes>
        </Router>
      </CustomerProvider>
    </ThemeProvider>
  );
};

export default App;