import React from 'react';

interface ICheckoutFieldProps {
  value: string | Date;
  name: string;
}

const CheckoutField = ({ name, value }: ICheckoutFieldProps) => {
  return (
    <div className="flex flex-wrap">
      <span className="text-xs font-bold">{name}: </span>
      <span className="text-xs break-words">{value}</span>
    </div>
  );
};

export default CheckoutField;
