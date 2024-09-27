import React from 'react';
import { Box, BoxProps } from '@mui/material';

const ModalContent: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxWidth: '90%',
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        p: 4,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ModalContent;