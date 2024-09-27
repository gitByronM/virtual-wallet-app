import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: '#9fe870',
        color: '#000',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '16px',
        padding: '12px',
        '&:hover': {
          backgroundColor: '#8ed45f',
        },
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;