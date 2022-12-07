import React from 'react';

import { classNames } from '@utils/classNames';

export type TColors = 'yellow' | 'green';

interface IPaymentInfoBlockLayoutProps {
  caption: React.ReactNode;
  price: React.ReactNode;
  color: TColors;
}

const classesByColors: Record<TColors, { caption: string; price: string; wrapper: string }> = {
  yellow: { caption: 'text-yellow-800', price: 'text-yellow-800', wrapper: 'bg-yellow-100' },
  green: { caption: 'text-green-800', price: 'text-green-800', wrapper: 'bg-green-100' },
};

const classes = {
  wrapper: 'min-w-[191px] h-16 rounded-md relative flex items-center justify-center',
  caption: 'absolute bottom-1 left-2 text-sm leading-normal',
  price: 'text-2xl font-bold leading-tight',
};

const PaymentInfoBlockLayout = ({ caption, price, color }: IPaymentInfoBlockLayoutProps) => {
  const colorClass = classesByColors[color];

  return (
    <div className={classNames(classes.wrapper, colorClass.wrapper)}>
      <span className={classNames(classes.caption, colorClass.caption)}>{caption}</span>
      <span className={classNames(classes.price, colorClass.price)}>{price}</span>
    </div>
  );
};

export default PaymentInfoBlockLayout;
