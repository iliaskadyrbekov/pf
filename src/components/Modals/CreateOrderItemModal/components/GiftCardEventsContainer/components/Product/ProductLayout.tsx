import React from 'react';

interface IProductLayoutProps {
  name: string;
  description: string;
  price: string;
  button: React.ReactNode;
}

const classes = {
  wrapper: 'bg-white shadow rounded-lg p-4 w-full',
  header: 'pb-5 h-[4.75rem]',
  name: 'font-bold text-lg sm:font-medium leading-normal text-gray-800',
  description: 'line-camp mt-1 text-gray-500 h-6',
  footer: 'sm:flex lg:block xl:flex justify-between items-center',
  btnWrapper: 'flex w-full items-center justify-end pl-4',
  price: 'pr-3.5 text-right',
  newPrice: 'text-sm font-bold sm:text-base leading-none text-[#2A2C32]',
  buttonWrapper: 'h-12',
};

const ProductLayout = ({ name, description, price, button }: IProductLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <span className={classes.name}>{name}</span>
        {description && <p className={classes.description}>{description}</p>}
      </div>
      <div className={classes.footer}>
        <div className={classes.btnWrapper}>
          <div className={classes.price}>
            <p className={classes.newPrice}>{price}</p>
          </div>
          <div className={classes.buttonWrapper}>{button}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
