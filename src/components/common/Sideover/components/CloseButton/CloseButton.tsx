import React from 'react';
import { XIcon } from '@heroicons/react/outline';

interface ICloseButtonProps {
  onClose(): void;
}

const CloseButton = ({ onClose }: ICloseButtonProps) => {
  return (
    <button
      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
      onClick={onClose}
    >
      <span className="sr-only">Close panel</span>
      <XIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default CloseButton;
