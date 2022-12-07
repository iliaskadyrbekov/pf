import React from 'react';

interface IEventLayoutProps {
  name: string;
  description: string;
  price: string;
  image: string;
  comparedWithPrice: string;
  availablePlaces?: React.ReactNode;
  button: React.ReactNode;
  productSelect: React.ReactNode;
  variationSelect: React.ReactNode;
  startTimeSelect: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white rounded-lg p-4 w-auto',
  content: 'sm:flex lg:block 2xl:flex sm:space-x-5 lg:space-x-0 2xl:space-x-5 mb-3',
  image: 'rounded-md h-full object-center object-cover',
  eventInfo: 'w-full',
  header: 'mb-3',
  name: 'font-bold text-lg sm:font-medium leading-normal text-gray-800',
  description: 'line-camp mt-1 text-gray-500 h-12',
  footer: 'sm:flex lg:block 2xl:flex justify-between items-center',
  btnWrapper: 'flex w-full items-center justify-end pl-4',
  priceWrapper: 'pr-3.5 text-right',
  comparedWithPrice: 'text-xs leading-none line-through text-[#A1AFCA]',
  price: 'text-sm font-bold sm:text-base leading-none text-[#2A2C32]',
  buttonWrapper: 'h-12',
  selects: 'grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-3',
  productSelect: 'col-start-1 col-span-2',
  variationSelect: 'col-start-1',
  startTimeSelect: 'col-start-1 sm:col-start-2',
  mobileImage: 'block sm:hidden lg:block 2xl:hidden',
  desktopImage: 'hidden sm:block lg:hidden 2xl:block',
  commonImage: 'h-[6rem] max-w-[7rem] w-full mb-3 2xl:mb-0',
};

const customStyles = {
  boxShadow: { boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)' },
};

const EventLayout = ({
  name,
  description,
  price,
  image,
  comparedWithPrice,
  availablePlaces,
  button,
  productSelect,
  variationSelect,
  startTimeSelect,
}: IEventLayoutProps) => {
  return (
    <div className={classes.wrapper} style={customStyles.boxShadow}>
      <div className={classes.content}>
        {image && (
          <div className={`${classes.desktopImage} ${classes.commonImage}`}>
            <img src={image} className={classes.image} width={112} height={96} alt={name} />
          </div>
        )}
        <div className={classes.eventInfo}>
          <div className={classes.header}>
            <span className={classes.name}>{name}</span>
            {description && <p className={classes.description}>{description}</p>}
          </div>
          {image && (
            <div className={`${classes.mobileImage} ${classes.commonImage}`}>
              <img src={image} className={classes.image} width={112} height={96} alt={name} />
            </div>
          )}
          <div className={classes.selects}>
            <div className={classes.productSelect}>{productSelect}</div>
            <div className={classes.variationSelect}>{variationSelect}</div>
            <div className={classes.startTimeSelect}>{startTimeSelect}</div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        {availablePlaces}
        <div className={classes.btnWrapper}>
          <div className={classes.priceWrapper}>
            {comparedWithPrice && <p className={classes.comparedWithPrice}>{comparedWithPrice}</p>}
            <p className={classes.price}>{price}</p>
          </div>
          <div className={classes.buttonWrapper}>{button}</div>
        </div>
      </div>
    </div>
  );
};

export default EventLayout;
