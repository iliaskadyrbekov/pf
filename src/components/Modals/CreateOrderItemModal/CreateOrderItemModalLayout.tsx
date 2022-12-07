import React from 'react';

interface ICreateOrderItemModalLayoutProps {
  title: React.ReactNode;
  closeButton: React.ReactNode;
  events: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col w-[550px]',
  headerWrapper: 'flex items-center justify-between mb-2',
  title: 'text-xl font-bold leading-normal text-gray-800',
};

const CreateOrderItemModalLayout = ({ title, closeButton, events }: ICreateOrderItemModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.headerWrapper}>
        <p className={classes.title}>{title}</p>
        {closeButton}
      </div>
      {events}
    </div>
  );
};

export default CreateOrderItemModalLayout;
