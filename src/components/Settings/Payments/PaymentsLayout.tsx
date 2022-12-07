import React from 'react';

interface IPaymentsLayoutProps {
  table: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-16',
};

const PaymentsLayout = ({ table, actions }: IPaymentsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {table}
      {actions}
    </div>
  );
};

export default PaymentsLayout;
