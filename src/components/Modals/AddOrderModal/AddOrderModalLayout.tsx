import React from 'react';

interface IAddOrderModalLayoutProps {
  iconLabel: string;
  addToCartIcon: React.ReactNode;
  form: React.ReactNode;
  closeIcon: React.ReactNode;
  loader: React.ReactNode;
}

const classes = {
  wrapper: 'my-4 p-4 sm:pb-8 sm:pt-4 w-96 sm:w-auto max-w-[32rem]',
  addToCartWrapper: 'text-center',
  addToCartIcon: 'flex justify-center pb-4',
  iconLabel: 'text-lg font-medium leading-normal text-gray-500',
  form: 'pt-[1.625rem]',
  closeIconWrapper: 'flex justify-end pb-2',
  closeIcon: 'cursor-pointer h-4 w-4 text-[#6A6A6A]',
  loaderWrapper: 'flex w-full mx-auto items-center justify-center w-14',
};

const AddOrderModalLayout = ({ addToCartIcon, closeIcon, iconLabel, form, loader }: IAddOrderModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.closeIconWrapper}>
          <div className={classes.closeIcon}>{closeIcon}</div>
        </div>
        <div className={classes.addToCartWrapper}>
          <span className={classes.addToCartIcon}>{addToCartIcon}</span>
          <span className={classes.iconLabel}>{iconLabel}</span>
        </div>
      </div>
      <div className={classes.form}>
        {loader && <div className={classes.loaderWrapper}>{loader}</div>}
        {form}
      </div>
    </div>
  );
};

export default AddOrderModalLayout;
