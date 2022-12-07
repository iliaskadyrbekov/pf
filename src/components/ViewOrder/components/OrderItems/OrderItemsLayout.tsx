import React from 'react';

interface IOrderItemsLayoutProps {
  title: React.ReactNode;
  emptyLabel: React.ReactNode;
  isEmpty: boolean;
  items: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-5',
  title: 'text-xl font-bold leading-normal text-gray-800',
  emptyLabel: 'text-2xl font-bold leading-7 text-gray-300 text-center py-8',
};

const OrderItemsLayout = ({ title, isEmpty, emptyLabel, items }: IOrderItemsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      {isEmpty && <p className={classes.emptyLabel}>{emptyLabel}</p>}
      {items}
    </div>
  );
};

export default OrderItemsLayout;
