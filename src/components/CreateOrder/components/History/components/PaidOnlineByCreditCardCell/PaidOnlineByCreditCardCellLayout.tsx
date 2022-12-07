import React from 'react';

interface IPaidOnlineByCreditCardCellLayoutProps {
  action: string;
  paymentId?: string;
  amount: string;
}

const classes = {
  wrapper: 'flex flex-col',
  text: 'text-sm leading-tight',
  amount: 'text-green-600',
  paymentId: 'text-indigo-600',
};

const PaidOnlineByCreditCardCellLayout = ({ action, paymentId, amount }: IPaidOnlineByCreditCardCellLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <span className={classes.text}>{action} </span>
        <span className={classes.amount}>{amount}</span>
      </div>
      <p className={classes.paymentId}>{paymentId}</p>
    </div>
  );
};

export default PaidOnlineByCreditCardCellLayout;
