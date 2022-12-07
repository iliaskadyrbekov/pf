import React from 'react';

interface IShopAddressStepLayoutProps {
  step: string;
  number: number;
}

const classes = {
  wrapper: 'flex items-center space-x-3',
  number:
    'inline-flex items-center justify-center w-12 h-12 bg-[#D1FAE5] rounded-full text-2xl font-medium leading-tight text-center text-[#219653]',
  step: 'text-xs font-bold leading-tight text-[#425376]',
};

const ShopAddressStepLayout = ({ step, number }: IShopAddressStepLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.number}>{number}</div>
      <span className={classes.step}>{step}</span>
    </div>
  );
};

export default ShopAddressStepLayout;
