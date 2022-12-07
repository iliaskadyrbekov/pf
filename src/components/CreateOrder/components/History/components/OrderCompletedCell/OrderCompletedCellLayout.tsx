import React from 'react';

interface IOrderCompletedLayoutProps {
  action: string;
  status: string;
}

const classes = {
  wrapper: '',
  text: 'text-sm leading-tight',
  status: 'text-green-600',
};

const OrderCompletedLayout = ({ action, status }: IOrderCompletedLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.text}>{action} </span>
      <span className={classes.status}>{status}</span>
    </div>
  );
};

export default OrderCompletedLayout;
