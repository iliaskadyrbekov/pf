import React from 'react';

interface IArrowDownIconProps {
  color?: string;
  onClick?: () => void;
}

const ArrowDownIcon = ({ color = '#6366F1', onClick }: IArrowDownIconProps) => {
  return (
    <svg onClick={onClick} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6663 6L7.99967 10.6667L3.33301 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
