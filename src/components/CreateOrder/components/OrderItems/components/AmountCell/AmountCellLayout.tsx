import React from 'react';

interface IAmountCellLayoutProps {
  price: React.ReactNode;
  discountPrice: React.ReactNode;
}

const classes = {
  price: 'text-xs leading-tight line-through text-gray-600',
  discountPrice: 'text-sm leading-tight text-gray-600',
};

const AmountCellLayout = ({ price, discountPrice }: IAmountCellLayoutProps) => {
  return (
    <div>
      {price && <p className={classes.price}>{price}</p>}
      <p className={classes.discountPrice}>{discountPrice}</p>
    </div>
  );
};

export default AmountCellLayout;
