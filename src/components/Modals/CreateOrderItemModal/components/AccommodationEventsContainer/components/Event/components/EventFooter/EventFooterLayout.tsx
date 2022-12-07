import React from 'react';

interface IEventFooterLayoutProps {
  price: string;
  comparedWithPrice: string;
  availablePlaces: React.ReactNode;
  button: React.ReactNode;
  tariff: string;
}

const classes = {
  footer: 'flex items-center mt-2 justify-end',
  availablePlaces: 'w-20',
  rightSideFooter: 'flex flex-wrap justify-end space-y-2',
  pricing: 'flex flex-col items-end justify-between ml-1',
  comparedWithPrice: 'text-xs leading-none line-through text-gray-400',
  price: 'text-base font-medium leading-none text-gray-800',
  tariff: 'text-sm leading-none text-gray-300 text-right w-20',
  buttonWrapper: 'ml-3',
};

const EventFooterLayout = ({ price, comparedWithPrice, availablePlaces, tariff, button }: IEventFooterLayoutProps) => {
  return (
    <div className={classes.footer}>
      <div className={classes.availablePlaces}>{availablePlaces}</div>
      <div className={classes.rightSideFooter}>
        <div className={classes.pricing}>
          <span className={classes.comparedWithPrice}>{comparedWithPrice}</span>
          <span className={classes.price}>{price}</span>
          <span className={classes.tariff}>{tariff}</span>
        </div>
        <div className={classes.buttonWrapper}>{button}</div>
      </div>
    </div>
  );
};

export default EventFooterLayout;
