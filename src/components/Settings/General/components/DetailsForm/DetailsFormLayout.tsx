import React from 'react';

interface IDetailsFormLayoutProps {
  shopName: React.ReactNode;
  logo: React.ReactNode;
  contactEmail: React.ReactNode;
  senderEmail: React.ReactNode;
  timeZone: React.ReactNode;
  currency: React.ReactNode;
  website: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-4',
  row: 'grid grid-cols-2 space-x-4',
  logoWrapper: 'w-full',
};

const DetailsFormLayout = ({
  shopName,
  logo,
  contactEmail,
  senderEmail,
  timeZone,
  currency,
  website,
}: IDetailsFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.row}>
        {shopName}
        {logo}
      </div>

      <div className={classes.row}>
        {contactEmail}
        {senderEmail}
      </div>

      <div className={classes.row}>
        {timeZone}
        {currency}
      </div>

      {website}
    </div>
  );
};

export default DetailsFormLayout;
