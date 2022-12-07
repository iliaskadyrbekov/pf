import { classNames } from '@utils/classNames';
import React from 'react';

interface IFormPricingFieldLayoutProps {
  className?: string;
  comparedWithPrice: React.ReactNode;
  price: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-row space-x-4',
  comparedWithPriceWrapper: 'flex-1',
  priceWrapper: 'flex-1',
};

const FormPricingFieldLayout = ({ comparedWithPrice, price, className }: IFormPricingFieldLayoutProps) => {
  return (
    <div className={classNames(classes.wrapper, className)}>
      {comparedWithPrice && <div className={classes.comparedWithPriceWrapper}>{comparedWithPrice}</div>}
      <div className={classes.priceWrapper}>{price}</div>
    </div>
  );
};

export default FormPricingFieldLayout;
