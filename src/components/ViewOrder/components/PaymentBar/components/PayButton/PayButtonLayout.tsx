import React from 'react';

import { classNames } from '@utils/classNames';

export type TColors = 'green' | 'gray';

interface IPayButtonLayoutProps {
  caption: string;
  color: TColors;
}

const classesByColors: Record<TColors, { caption: string; wrapper: string }> = {
  green: { caption: 'text-green-800', wrapper: 'bg-green-100 border-green-600' },
  gray: { caption: 'text-gray-600', wrapper: 'bg-gray-300 border-gray-600' },
};

const classes = {
  wrapper: 'flex items-center justify-center px-4 py-2 shadow border rounded-md h-16',
  pay: 'text-2xl font-medium leading-tight',
};

const PayButtonLayout = ({ color, caption }: IPayButtonLayoutProps) => {
  const colorClass = classesByColors[color];

  return (
    <div className={classNames(classes.wrapper, colorClass.wrapper)}>
      <span className={classNames(classes.pay, colorClass.caption)}>{caption}</span>
    </div>
  );
};

export default PayButtonLayout;
