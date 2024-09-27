import React from 'react';
import ModalInput from '../atoms/ModalInput';

interface PaymentAmountStepProps {
  amount: number | string;
  setAmount: (amount: string) => void;
  error: string | null;
}

const PaymentAmountStep: React.FC<PaymentAmountStepProps> = ({ amount, setAmount, error }) => {
  return (
    <ModalInput
      label="Cantidad a pagar"
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      error={Boolean(error)}
      helperText={error}
      InputProps={{
        startAdornment: <span style={{ marginRight: '8px' }}>$</span>,
      }}
    />
  );
};

export default PaymentAmountStep;