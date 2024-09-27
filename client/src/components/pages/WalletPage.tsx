import React, { useState } from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { useCustomer } from '../../context/CustomerContext';
import RechargeModal from '../organisms/RechargeModal';
import PaymentModal from '../organisms/PaymentModal';
import Card from '../atoms/Card';
import ActionButton from '../atoms/ActionButton';
import BalanceDisplay from '../molecules/BalanceDisplay';
import PersonalInfo from '../molecules/PersonalInfo';
import { useNavigate } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenRechargeModal = () => setIsRechargeModalOpen(true);
  const handleCloseRechargeModal = () => setIsRechargeModalOpen(false);

  const handleOpenPaymentModal = () => setIsPaymentModalOpen(true);
  const handleClosePaymentModal = () => setIsPaymentModalOpen(false);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2e4369', fontWeight: 700, mb: 4 }}>
        Tu billetera
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <BalanceDisplay balance={customer.balance ?? 'No disponible'} />
            <PersonalInfo document={customer.document} phone={customer.phone} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <ActionButton onClick={handleOpenRechargeModal}>
                Recargar saldo
              </ActionButton>
              <ActionButton variation="secondary" onClick={handleOpenPaymentModal}>
                Realizar pago
              </ActionButton>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <ActionButton onClick={handleGoBack} variation="secondary">
          Volver al Inicio
        </ActionButton>
      </Box>

      <RechargeModal
        open={isRechargeModalOpen}
        handleClose={handleCloseRechargeModal}
      />

      <PaymentModal
        open={isPaymentModalOpen}
        handleClose={handleClosePaymentModal}
      />
    </Container>
  );
};

export default WalletPage;