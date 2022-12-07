import React from 'react';
import PaymentInfoBlockLayout, { TColors } from './PaymentInfoBlockLayout';

interface IPaymentInfoBlockProps {
  caption: React.ReactNode;
  price: React.ReactNode;
  color: TColors;
}

const PaymentInfoBlock = (props: IPaymentInfoBlockProps) => {
  return <PaymentInfoBlockLayout {...props} />;
};

export default PaymentInfoBlock;
