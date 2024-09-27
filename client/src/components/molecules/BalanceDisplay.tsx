import React from 'react';
import { Typography, Box } from '@mui/material';

interface BalanceDisplayProps {
  balance: number | string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography variant="h6" sx={{ color: '#2e4369', mb: 1 }}>
        Saldo disponible
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 700, color: '#2e4369' }}>
        {typeof balance === 'number' ? `$${balance.toFixed(2)}` : balance} USD
      </Typography>
    </Box>
  );
};

export default BalanceDisplay;