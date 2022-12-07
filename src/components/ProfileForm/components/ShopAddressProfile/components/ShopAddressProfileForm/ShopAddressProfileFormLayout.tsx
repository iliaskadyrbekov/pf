import React from 'react';

interface IShopAddressProfileFormLayoutProps {
  title: string;
  subtitle: string;
  legalBusinessName: React.ReactNode;
  street: React.ReactNode;
  postalCode: React.ReactNode;
  city: React.ReactNode;
  country: React.ReactNode;
  phone: React.ReactNode;
  website: React.ReactNode;
  isBusiness: React.ReactNode;
  button: React.ReactNode;
}

const classes = {
  wrapper:
    'lg:col-start-1 lg:col-span-1 px-4 sm:px-11 pb-10 pt-12 sm:pt-20 mx-auto lg:mx-0 max-w-[36rem] lg:max-w-full w-full',
  title: 'px-4 text-2xl font-medium leading-relaxed text-center text-gray-600',
  subtitleWrapper: 'px-6 mt-2.25 mb-8',
  subtitle: 'text-sm text-center text-gray-400',
  form: 'flex flex-col items-center',
  inputsWrapper: 'space-y-4 w-full',
  row: 'flex flex-row space-x-4',
  button: 'mt-5 mb-8',
};

const ShopAddressProfileFormLayout: React.FC<IShopAddressProfileFormLayoutProps> = ({
  title,
  subtitle,
  legalBusinessName,
  street,
  postalCode,
  city,
  country,
  phone,
  website,
  isBusiness,
  button,
}: IShopAddressProfileFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.subtitleWrapper}>
        <p className={classes.subtitle}>{subtitle}</p>
      </div>
      <div className={classes.form}>
        <div className={classes.inputsWrapper}>
          {legalBusinessName}
          {street}
          <div className={classes.row}>
            {postalCode}
            {city}
          </div>
          {country}
          {phone}
          {website}
          {isBusiness}
        </div>
        <div className={classes.button}>{button}</div>
      </div>
    </div>
  );
};

export default ShopAddressProfileFormLayout;
