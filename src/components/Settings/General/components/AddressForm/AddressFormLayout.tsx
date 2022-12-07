import React from 'react';

interface IAddressFormLayoutProps {
  businessName: React.ReactNode;
  VAT: React.ReactNode;
  street: React.ReactNode;
  apartment: React.ReactNode;
  city: React.ReactNode;
  postalCode: React.ReactNode;
  country: React.ReactNode;
  phone: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-4',
  row: 'grid grid-cols-2 space-x-4',
};

const AddressFormLayout = ({
  businessName,
  VAT,
  street,
  apartment,
  city,
  postalCode,
  country,
  phone,
}: IAddressFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {businessName}

      <div className={classes.row}>
        {VAT}
        {phone}
      </div>

      <div className={classes.row}>
        {street}
        {apartment}
      </div>

      <div className={classes.row}>
        {city}
        {postalCode}
      </div>

      {country}
    </div>
  );
};

export default AddressFormLayout;
