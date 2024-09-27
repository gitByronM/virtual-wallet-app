import React from 'react';
import { Typography, Box } from '@mui/material';

interface PersonalInfoProps {
  document: string;
  phone: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ document, phone }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body1" sx={{ color: '#2e4369', mb: 1 }}>
        Documento: <strong>{document}</strong>
      </Typography>
      <Typography variant="body1" sx={{ color: '#2e4369' }}>
        Celular: <strong>{phone}</strong>
      </Typography>
    </Box>
  );
};

export default PersonalInfo;