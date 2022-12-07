import React from 'react';
import { Button } from '@components/common/Button';
import ActionsLayout from './ActionsLayout';

interface IActionsProps {
  onSubmit(): void;
  onClose(): void;
  onRemove(): void;
}

const Actions = ({ onSubmit, onClose, onRemove }: IActionsProps) => {
  return (
    <ActionsLayout
      remove={
        <Button onClick={onRemove} color="delete">
          Delete
        </Button>
      }
      cancel={<Button onClick={onClose}>Cancel</Button>}
      save={
        <Button onClick={onSubmit} color="primary">
          Save
        </Button>
      }
    />
  );
};

export default Actions;
