import React from 'react';

interface ICloseIconProps {
  onClick?: () => void;
}

const CloseIcon = ({ onClick }: ICloseIconProps) => {
  return (
    <svg onClick={onClick} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12L12 4M4 4L12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default CloseIcon;
