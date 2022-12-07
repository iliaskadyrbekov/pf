import React from 'react';

interface IPayButtonLayoutProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?(): void;
}

const classes = {
  wrapper: (disabled?: boolean) =>
    `flex items-center justify-center px-4 py-2 ${
      disabled ? 'bg-gray-300' : 'bg-green-600'
    } shadow rounded-md cursor-pointer h-full`,
  pay: 'text-2xl font-medium leading-tight text-white',
};

const PayButtonLayout = ({ children, disabled, onClick }: IPayButtonLayoutProps) => {
  return (
    <div className={classes.wrapper(disabled)} onClick={onClick}>
      <span className={classes.pay}>{children}</span>
    </div>
  );
};

export default PayButtonLayout;
