import React, {useState} from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputFieldProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, required = false, helperText = '', ...props }) => {
  const [isValid, setIsValid] = useState(true);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+[1-9]{1}[0-9]{10,14}$/;
    console.log(phoneRegex.test(phone));
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(e);
    if (label === "Celular") {
      setIsValid(validatePhoneNumber(newValue));
    }
  };

  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={handleChange}
      error={!isValid}
      helperText={!isValid ? helperText : ''}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
        style: { 
          position: 'relative', 
          transform: 'none',
          fontSize: '14px',
          fontWeight: 500,
          marginBottom: '4px'
        }
      }}
      InputProps={{
        style: { 
          borderRadius: '4px',
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0'
        }
      }}
      {...props}
    />
  );
};

export default InputField;