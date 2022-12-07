import React from 'react';

interface IVariationFormLayoutProps {
  variationInfo: React.ReactNode;
  variationPricing: React.ReactNode;
  minMaxPurchase: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4',
};

const VariationFormLayout = ({ variationInfo, variationPricing, minMaxPurchase }: IVariationFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {variationInfo}
      {variationPricing}
      {minMaxPurchase}
    </div>
  );
};

export default VariationFormLayout;
