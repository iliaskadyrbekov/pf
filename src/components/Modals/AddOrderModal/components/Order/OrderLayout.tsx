import React from 'react';

interface ITicketLayoutProps {
  title: string;
  ticketName?: string;
  ticketIcon: React.ReactNode;
  fields: React.ReactNode;
}

const classes = {
  wrapper: 'sm:pb-[1.375rem]',
  header: 'p-4 flex items-center bg-[#F9F9F9] rounded-lg',
  ticketIcon: 'h-5 w-5',
  headerText: 'pl-3 space-x-2',
  title: 'text-base font-medium leading-none text-[#2A2C32]',
  ageCategory: 'text-base leading-none text-[#2A2C32]',
};

const OrderLayout = ({ title, ticketName, ticketIcon, fields }: ITicketLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.ticketIcon}>{ticketIcon}</div>
        <p className={classes.headerText}>
          <span className={classes.title}>{title}</span>
          {ticketName && <span className={classes.ageCategory}>{ticketName}</span>}
        </p>
      </div>
      {fields}
    </div>
  );
};

export default OrderLayout;
