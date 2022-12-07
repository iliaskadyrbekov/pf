import React from 'react';

interface IShopAddressProfileContentLayoutProps {
  title: string;
  description: string;
  steps: React.ReactNode[];
  gradient: string;
}

const classes = {
  wrapper: 'lg:col-start-2 lg:col-span-2 bg-[#F6F5FB] px-4 sm:px-16 xl:px-20 pt-12 sm:pt-20 pb-12 sm:pb-20',
  title: 'text-4xl font-bold leading-none uppercase',
  description: 'text-xl font-light leading-relaxed text-[#425376] max-w-[49.5rem] w-full pt-5 pb-10',
  steps: 'space-y-6 md:space-y-0 md:flex md:space-x-16',
};

const customStyles = {
  wrapper: (gradient: string) => ({ backgroundImage: `url(${gradient})` }),
};

const ShopAddressProfileContentLayout = ({
  title,
  description,
  steps,
  gradient,
}: IShopAddressProfileContentLayoutProps) => {
  return (
    <div className={classes.wrapper} style={customStyles.wrapper(gradient)}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.description}>{description}</p>
      <div className={classes.steps}>{steps}</div>
    </div>
  );
};

export default ShopAddressProfileContentLayout;
