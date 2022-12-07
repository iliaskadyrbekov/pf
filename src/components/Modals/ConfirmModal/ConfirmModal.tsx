import { Button } from '@components/common/Button';
import React from 'react';
import ConfirmModalLayout from './ConfirmModalLayout';

interface IConfirmModalProps {
  onClose(): void;
  onConfirm(): void;
  title: React.ReactNode;
  message: React.ReactNode;
  confirmButtonText?: React.ReactNode;
}

const ConfirmModal = ({ onClose, onConfirm, title, message, confirmButtonText }: IConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ConfirmModalLayout
      title={title}
      message={message}
      actions={[
        <Button variant="contained" color="default" key="1" onClick={onClose}>
          Close
        </Button>,
        <Button onClick={handleConfirm} variant="contained" color="primary" key="2">
          {confirmButtonText || 'Confirm'}
        </Button>,
      ]}
    />
  );
};

export default ConfirmModal;
