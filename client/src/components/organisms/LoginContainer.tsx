import React from 'react';
import { Box, Typography } from '@mui/material';
import LoginForm from '../molecules/LoginForm';
import AuthLink from '../molecules/AuthLink';

interface LoginContainerProps {
  onLogin: (documentId: string, phoneNumber: string) => void;
  onCreateClient: (document: string, names: string, email: string, phone: string) => void;
  error: string | null;
  isSignUp: boolean;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ onLogin, error, onCreateClient, isSignUp }) => {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>
        {isSignUp ? 'Bienvenido' : 'Bienvenido de vuelta'}
      </Typography>
      <AuthLink isSignUp={isSignUp} />
      <LoginForm 
        onSubmit={onLogin} 
        onCreateClient={onCreateClient} 
        error={error} 
        isSignUp={isSignUp}
      />
    </Box>
  );
};

export default LoginContainer;