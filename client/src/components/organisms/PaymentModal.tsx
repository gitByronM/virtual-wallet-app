import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCustomer } from '../../context/CustomerContext';
import { checkBalance, confirmPayment, makePayment } from '../../api/customers';
import ModalTemplate from '../organisms/ModalTemplate';
import StepIndicator from '../atoms/StepIndicator';
import PaymentAmountStep from '../molecules/PaymentAmountStep';
import PaymentConfirmationStep from '../molecules/PaymentConfirmationStep';

interface PaymentModalProps {
  open: boolean;
  handleClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, handleClose }) => {
  const { customer, setCustomer } = useCustomer();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number | string>('');
  const [token, setToken] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (newBalance: number) => {
    setCustomer({ ...customer, balance: newBalance });
    toast.success('Balance actualizado con exito.');
  };

  const handleMakePayment = async () => {
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Por favor ingresa una cantidad mayor a 0.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await makePayment(customer.document, customer.phone, Number(amount));
      setSessionId(response.sessionId);
      setStep(2);
      toast.success(response.message);
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const handleConfirmPayment = async () => {
    if (token.length !== 6) {
      setError('El token debe tener 6 digitos.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await confirmPayment(customer.document, customer.phone, sessionId, token);
      const newBalance = await checkBalance(customer.document, customer.phone);
      handleSuccess(newBalance);
      toast.success(response);
      handleClose();
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setStep(1);
    setAmount('');
    setToken('');
    setSessionId('');
    setError(null);
  };

  return (
    <ModalTemplate
      open={open}
      onClose={handleClose}
      title={step === 1 ? "Realizar un pago" : "Confirmar pago"}
      onConfirm={step === 1 ? handleMakePayment : handleConfirmPayment}
      confirmText={step === 1 ? "Realizar pago" : "Confirmar pago"}
      isLoading={isLoading}
    >
      <StepIndicator currentStep={step} totalSteps={2} />
      {step === 1 && (
        <PaymentAmountStep
          amount={amount}
          setAmount={setAmount}
          error={error}
        />
      )}
      {step === 2 && (
        <PaymentConfirmationStep
          token={token}
          setToken={setToken}
          error={error}
        />
      )}
    </ModalTemplate>
  );
};

export default PaymentModal;