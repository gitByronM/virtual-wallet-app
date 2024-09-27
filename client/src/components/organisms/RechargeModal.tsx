import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { checkBalance, rechargeWallet } from '../../api/customers';
import toast from 'react-hot-toast';
import ModalTemplate from './ModalTemplate';
import ModalInput from '../atoms/ModalInput';

interface RechargeModalProps {
  open: boolean;
  handleClose: () => void;
}

const RechargeModal: React.FC<RechargeModalProps> = ({ open, handleClose }) => {
  const { customer, setCustomer } = useCustomer();
  const [amount, setAmount] = useState<number | string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRechargeSuccess = (newBalance: number) => {
    setCustomer({ ...customer, balance: newBalance });
    toast.success('Saldo agregado con exito.');
    handleClose();
  };

  const handleConfirmRecharge = async () => {
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Por favor ingresa un monto mayor a 0.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await rechargeWallet(customer.document, customer.phone, Number(amount));
      const newBalance = await checkBalance(customer.document, customer.phone);
      handleRechargeSuccess(newBalance);
    } catch (error) {
      toast.error('Ocurrio un error recargando la billetera. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalTemplate
      open={open}
      onClose={handleClose}
      title="Agrega dinero a tu blletera"
      onConfirm={handleConfirmRecharge}
      confirmText="Confirmar recarga"
      isLoading={isLoading}
    >
      <ModalInput
        label="Cantidad a recargar"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={Boolean(error)}
        helperText={error}
        InputProps={{
          startAdornment: <span style={{ marginRight: '8px' }}>$</span>,
        }}
      />
    </ModalTemplate>
  );
};

export default RechargeModal;