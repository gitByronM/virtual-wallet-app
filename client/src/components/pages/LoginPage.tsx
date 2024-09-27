import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import LoginContainer from '../organisms/LoginContainer';
import { useCustomer } from '../../context/CustomerContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { checkBalance, createClient } from '../../api/customers';

interface LoginPageProps {
  isSignUp: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ isSignUp }) => {
  const { setCustomer } = useCustomer();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckBalance = async (document: string, phone: string) => {
    setError(null);
    try {
      const balance = await checkBalance(document, phone);
      setCustomer({ document, names: '', email: '', phone, balance: balance });
      navigate('/wallet');
    } catch (err: any) {
      setError('Error al consultar saldo.');
    }
  };

  const handleCreateClient = async (document: string, names: string, email: string, phone: string) => {
    setError(null);
    try {
      const newCustomer = await createClient(document, names, email, phone);
      setCustomer({...newCustomer, balance: 0})
      toast.success('Cliente registrado exitosamente.');
      navigate('/wallet');
    } catch (err) {
      setError('Error al crear cliente.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LoginContainer 
        onLogin={handleCheckBalance} 
        error={error} 
        onCreateClient={handleCreateClient} 
        isSignUp={isSignUp}
      />
    </Container>
  );
};

export default LoginPage;