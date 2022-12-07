import React from 'react';

interface IArrowUpIconProps {
  color?: string;
  onClick?: () => void;
}

const ArrowUpIcon = ({ color = '#9D9D9D', onClick }: IArrowUpIconProps) => {
  return (
    <svg onClick={onClick} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.33366 10L8.00032 5.33333L12.667 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpIcon;
