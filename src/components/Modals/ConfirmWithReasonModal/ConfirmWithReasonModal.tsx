import React from 'react';

import ConfirmWithReasonModalLayout from './ConfirmWithReasonModalLayout';
import { Button } from '@components/common/Button';
import { TextArea } from '@components/common/TextArea';

interface IConfirmWithReasonModalProps {
  onClose(): void;
  onConfirm(reason: string): void;
  title: React.ReactNode;
  message: React.ReactNode;
  confirmButtonText?: React.ReactNode;
}

const ConfirmWithReasonModal = ({
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
}: IConfirmWithReasonModalProps) => {
  const [reason, setReason] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(reason);
    onClose();
  };

  return (
    <ConfirmWithReasonModalLayout
      title={title}
      message={message}
      textarea={<TextArea value={reason} onChange={handleChange} className="resize-none" />}
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

export default ConfirmWithReasonModal;
