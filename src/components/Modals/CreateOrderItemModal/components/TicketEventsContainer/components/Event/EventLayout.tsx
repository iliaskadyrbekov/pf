import React from 'react';

interface IEventLayoutProps {
  name: string;
  description: string;
  price: string;
  comparedWithPrice: string;
  availablePlaces: React.ReactNode;
  variationSelect: React.ReactNode;
  timeDropdown: React.ReactNode;
  button: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white shadow rounded-lg p-4 w-full',
  header: 'flex justify-between',
  infoIcon: 'mt-1 ml-2 text-[#504AF6] h-5 w-5',
  name: 'font-bold text-lg sm:font-medium leading-normal text-gray-800',
  description: 'line-camp mt-1 text-gray-500 h-12',
  dropdowns: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 pt-[1.125rem] sm:pt-2.5 pb-4 gap-3',
  footer: 'sm:flex lg:block xl:flex justify-between items-center',
  btnWrapper: 'flex w-full items-center justify-end pl-4',
  price: 'pr-3.5 text-right',
  oldPrice: 'text-xs leading-none line-through text-[#A1AFCA]',
  newPrice: 'text-sm font-bold sm:text-base leading-none text-[#2A2C32]',
  buttonWrapper: 'h-12',
};

const EventLayout = ({
  name,
  description,
  price,
  comparedWithPrice,
  availablePlaces,
  variationSelect,
  timeDropdown,
  button,
}: IEventLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <span className={classes.name}>{name}</span>
        {description && <p className={classes.description}>{description}</p>}
      </div>
      <div className={classes.dropdowns}>
        {variationSelect}
        {timeDropdown}
      </div>
      <div className={classes.footer}>
        {availablePlaces}
        <div className={classes.btnWrapper}>
          <div className={classes.price}>
            <p className={classes.oldPrice}>{comparedWithPrice}</p>
            <p className={classes.newPrice}>{price}</p>
          </div>
          <div className={classes.buttonWrapper}>{button}</div>
        </div>
      </div>
    </div>
  );
};

export default EventLayout;
