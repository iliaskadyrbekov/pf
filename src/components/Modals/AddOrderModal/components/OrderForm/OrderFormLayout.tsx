import React from 'react';

interface IOrderFormLayoutProps {
  orderItems: React.ReactNode;
  cancelButton: React.ReactNode;
  goToCartButton: React.ReactNode;
}

const classes = {
  buttons: 'sm:flex sm:justify-center sm:space-x-4 space-y-1.5 sm:space-y-0',
  orders: 'sm:border-b sm:border-opacity-10 sm:border-dashed pb-4 sm:mb-8',
  cancelButtonWrapper: 'w-full sm:w-44 h-12',
  goToCartButtonWrapper: 'w-full sm:w-60 h-12',
};

const OrderFormLayout = ({ orderItems, cancelButton, goToCartButton }: IOrderFormLayoutProps) => {
  return (
    <>
      <div className={classes.orders}>{orderItems}</div>
      <div className={classes.buttons}>
        <div className={classes.cancelButtonWrapper}>{cancelButton}</div>
        <div className={classes.goToCartButtonWrapper}>{goToCartButton}</div>
      </div>
    </>
  );
};

export default OrderFormLayout;
