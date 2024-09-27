import React from 'react';
import { Box, Typography } from '@mui/material';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: i < currentStep ? '#00b9ff' : '#e0e0e0',
            mx: 0.5,
          }}
        />
      ))}
    </Box>
  );
};

export default StepIndicator;