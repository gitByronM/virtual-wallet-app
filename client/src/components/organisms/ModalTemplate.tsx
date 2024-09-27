import React from 'react';
import { Modal, ModalProps } from '@mui/material';
import ModalContent from '../molecules/ModalContent';
import ModalTitle from '../atoms/ModalTitle';
import ActionButton from '../atoms/ActionButton';

interface ModalTemplateProps extends Omit<ModalProps, 'children'> {
  title: string;
  onConfirm: () => void;
  confirmText: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  title,
  onConfirm,
  confirmText,
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <Modal {...props}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        {children}
        <ActionButton
          onClick={onConfirm}
          disabled={isLoading}
          sx={{ mt: 3 }}
          fullWidth
        >
          {isLoading ? 'Procesando...' : confirmText}
        </ActionButton>
      </ModalContent>
    </Modal>
  );
};

export default ModalTemplate;