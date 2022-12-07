import React from 'react';

interface IPaymentBarLayoutProps {
  orderAmount: React.ReactNode;
  VAT: React.ReactNode;
  totalOrderAmount: React.ReactNode;
  paid: React.ReactNode;
  leftToPay: React.ReactNode;
  pay: React.ReactNode;
}

const classes = {
  wrapper: 'h-28 bg-white flex justify-between items-center py-6 px-12 shadow-lg ring-1 ring-black ring-opacity-5',
  orderInfo: 'flex flex-col text-right',
  caption: 'text-sm leading-tight text-gray-600',
  price: 'text-sm font-medium leading-tight text-gray-900',
  paidBlock: 'min-w-[190px] h-16 bg-green-100 rounded-md',
  leftToPayBlock: 'min-w-[190px] h-16 bg-yellow-100 rounded-md',
  paymentInfo: 'flex space-x-4',
};

const PaymentBarLayout = ({ orderAmount, VAT, totalOrderAmount, paid, leftToPay, pay }: IPaymentBarLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.orderInfo}>
        <div>
          <span className={classes.caption}>Order amount: </span>
          <span className={classes.price}>{orderAmount}</span>
        </div>
        <div>
          <span className={classes.caption}>VAT: </span>
          <span className={classes.price}>{VAT}</span>
        </div>
        <div>
          <span className={classes.caption}>Total order amount: </span>
          <span className={classes.price}>{totalOrderAmount}</span>
        </div>
      </div>
      <div className={classes.paymentInfo}>
        {paid}
        {leftToPay}
        {pay}
      </div>
    </div>
  );
};

export default PaymentBarLayout;
