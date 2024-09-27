import React from 'react';
import { Paper, PaperProps } from '@mui/material';

const Card: React.FC<PaperProps> = ({ children, ...props }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Card;