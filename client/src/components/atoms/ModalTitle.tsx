import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

const ModalTitle: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography
      variant="h5"
      component="h2"
      sx={{
        color: '#2e4369',
        fontWeight: 700,
        mb: 3,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default ModalTitle;