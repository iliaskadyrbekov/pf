import React from 'react';

interface IPricingLayoutProps {
  pricingName: React.ReactNode;
  pricing: React.ReactNode;
  pricingTariff: React.ReactNode;
}

const classes = {
  wrapper: 'grid grid-cols-5 gap-x-4 items-end',
  pricingName: 'col-span-2',
  pricing: 'col-span-2',
  pricingTariff: '',
};

const PricingLayout = ({ pricingName, pricing, pricingTariff }: IPricingLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.pricingName}>{pricingName}</div>
      <div className={classes.pricing}>{pricing}</div>
      <div className={classes.pricingTariff}>{pricingTariff}</div>
    </div>
  );
};

export default PricingLayout;
