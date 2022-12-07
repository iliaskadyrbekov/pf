import React from 'react';

interface IOrderItemCreatorLayoutProps {
  title: React.ReactNode;
  activities: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-5',
  title: 'text-xl font-bold leading-normal text-gray-800',
  activitiesWrapper: 'flex flex-wrap',
};

const OrderItemCreatorLayout = ({ title, activities }: IOrderItemCreatorLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.activitiesWrapper}>{activities}</div>
    </div>
  );
};

export default OrderItemCreatorLayout;
