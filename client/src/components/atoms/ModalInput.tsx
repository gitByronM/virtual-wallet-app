import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const ModalInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
        sx: { color: '#2e4369' }
      }}
      InputProps={{
        sx: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00b9ff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00b9ff',
          },
        }
      }}
      sx={{
        '& .MuiFormHelperText-root': {
          color: '#ff4d4f',
        }
      }}
      {...props}
    />
  );
};

export default ModalInput;