import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ActionButtonProps extends ButtonProps {
  variation?: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({ variation = 'primary', children, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: variation === 'primary' ? '#00b9ff' : '#2e4369',
        color: '#fff',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '16px',
        padding: '12px 24px',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: variation === 'primary' ? '#00a3e0' : '#1e2c47',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionButton;