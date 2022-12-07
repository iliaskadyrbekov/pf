import React from 'react';

interface IBuyerInfoLayoutProps {
  title: string;
  avatar?: string;
  fullName: React.ReactNode;
  email: React.ReactNode;
  phone: React.ReactNode;
  postalAddress: React.ReactNode;
  companyName: React.ReactNode;
  existingCustomer: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-5',
  header: 'flex justify-between',
  title: 'text-xl font-bold leading-normal text-gray-800',
  content: 'flex space-x-4',
  avatar: 'rounded-full w-20 h-20',
  infoWrapper: 'space-y-1',
};

const BuyerInfoLayout = ({
  avatar,
  title,
  fullName,
  email,
  phone,
  postalAddress,
  companyName,
  existingCustomer,
}: IBuyerInfoLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <p className={classes.title}>{title}</p>
        {existingCustomer}
      </div>
      <div className={classes.content}>
        {avatar && <img className={classes.avatar} src={avatar} />}
        <div className={classes.infoWrapper}>
          {fullName}
          {email}
          {phone}
          {postalAddress}
          {companyName}
        </div>
      </div>
    </div>
  );
};

export default BuyerInfoLayout;
