import React, { useState } from 'react';
import { Alert, Box } from '@mui/material';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

interface LoginFormProps {
  onSubmit: (documentId: string, phoneNumber: string) => void;
  error: string | null;
  onCreateClient: (document: string, names: string, email: string, phone: string) => void;
  isSignUp: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, onCreateClient, isSignUp }) => {
  const [documentId, setDocumentId] = useState('');
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!documentId.trim()) {
      errors.documentId = 'El documento es requerido.';
    }

    if (isSignUp) {
      if (!names.trim()) {
        errors.names = 'Los nombres son requeridos.';
      }

      if (!email.trim()) {
        errors.email = 'El email es requerido.';
      } 
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'El celular es requerido.';
    } else if (!/^\+?[1-9]\d{9,14}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Número de teléfono no válido. Debe estar en formato internacional (+123456789) y tener entre 10 y 14 dígitos.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isSignUp) {
        onCreateClient(documentId, names, email, phoneNumber);
      } else {
        onSubmit(documentId, phoneNumber);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <InputField
        label="Documento"
        value={documentId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDocumentId(e.target.value)}
        required
        error={!!formErrors.documentId}
        helperText={formErrors.documentId}
      />
      {isSignUp && (
        <>
          <InputField
            label="Nombres"
            value={names}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNames(e.target.value)}
            required
            error={!!formErrors.names}
            helperText={formErrors.names}
          />
          <InputField
            label="Email"
            type='email'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            error={!!formErrors.email}
            helperText={formErrors.email || 'Por favor ingresa un email válido.'}
          />
        </>
      )}
      <InputField
        label="Celular"
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        type='tel'
        required
        error={!!formErrors.phoneNumber}
        helperText={formErrors.phoneNumber || 'Número de teléfono no válido. Debe estar en formato internacional (+123456789) y tener entre 10 y 14 dígitos.'}
      />
      <Button type="submit" sx={{ mt: 2, mb: 2 }}>
        {isSignUp ? 'Crear Cliente' : 'Consultar Saldo'}
      </Button>
    </Box>
  );
};

export default LoginForm;