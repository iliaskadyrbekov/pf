import React from 'react';

interface IVariationFormLayoutProps {
  variationInfo: React.ReactNode;
  variationPricing: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4',
};

const VariationFormLayout = ({ variationInfo, variationPricing }: IVariationFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {variationInfo}
      {variationPricing}
    </div>
  );
};

export default VariationFormLayout;
