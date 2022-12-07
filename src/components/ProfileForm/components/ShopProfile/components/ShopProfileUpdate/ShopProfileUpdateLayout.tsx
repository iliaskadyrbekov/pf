import React from 'react';

interface IShopProfileUpdateLayoutProps {
  date: string;
  status: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  monthUpdates: string;
}

const classes = {
  wrapper: 'flex flex-col justify-center lg:col-start-2 lg:col-span-2 bg-[#F6F5FB] px-4 sm:px-11 pt-12 sm:pt-20 pb-12',
  date: 'text-xs font-light leading-none text-gray-600 pb-2',
  status: 'text-xl font-light leading-none text-indigo-600 uppercase pb-6',
  title: 'text-4xl font-bold leading-none pb-5',
  subtitle: 'text-xl font-light leading-tight text-[#425376]',
  description: 'text-sm font-light leading-10 text-[#425376] max-w-[49.5rem] w-full pb-11',
};

const customStyles = {
  wrapper: (gradient: string) => ({ backgroundImage: `url(${gradient})` }),
};

const ShopProfileUpdateLayout = ({
  date,
  description,
  monthUpdates,
  gradient,
  status,
  subtitle,
  title,
}: IShopProfileUpdateLayoutProps) => {
  return (
    <div className={classes.wrapper} style={customStyles.wrapper(gradient)}>
      <span className={classes.date}>{date}</span>
      <span className={classes.status}>{status}</span>
      <h1 className={classes.title}>{title}</h1>
      <h4 className={classes.subtitle}>{subtitle}</h4>
      <p className={classes.description}>{description}</p>
      <img src={monthUpdates} alt={title} />
    </div>
  );
};

export default ShopProfileUpdateLayout;
