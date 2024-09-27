import React from 'react';
import ModalInput from '../atoms/ModalInput';

interface PaymentConfirmationStepProps {
  token: string;
  setToken: (token: string) => void;
  error: string | null;
}

const PaymentConfirmationStep: React.FC<PaymentConfirmationStepProps> = ({ token, setToken, error }) => {
  return (
    <ModalInput
      label="Ingresa el token"
      type="text"
      value={token}
      onChange={(e) => setToken(e.target.value)}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default PaymentConfirmationStep;