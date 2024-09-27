import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AuthLinkProps {
  isSignUp: boolean;
}

const AuthLink: React.FC<AuthLinkProps> = ({ isSignUp }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Typography variant="body2" align="center" sx={{ mb: 2 }}>
      {isSignUp ? (
        <>
          ¿Ya tienes una cuenta?{' '}
          <Typography
            component="span"
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
            onClick={() => handleNavigation('/')}
          >
            Inicia sesión
          </Typography>
        </>
      ) : (
        <>
          ¿Eres nuevo?{' '}
          <Typography
            component="span"
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
            onClick={() => handleNavigation('/sign-up')}
          >
            Regístrate aquí
          </Typography>
        </>
      )}
    </Typography>
  );
};

export default AuthLink;