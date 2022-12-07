import React from 'react';

interface IArrowRightIconProps {
  stroke?: string;
}

const ArrowRightIcon = ({ stroke = '#4F4F4F' }: IArrowRightIconProps) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.91675 7H11.0834" stroke={stroke} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7 2.91663L11.0833 6.99996L7 11.0833"
        stroke={stroke}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
