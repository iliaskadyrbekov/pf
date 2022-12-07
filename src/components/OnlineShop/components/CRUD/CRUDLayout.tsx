import React from 'react';

interface ICRUDLayoutProps {
  actions: React.ReactNode;
  mainInfo: React.ReactNode;
  shopDetails: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-row',
  formWrapper: 'flex-1 space-y-5',
  shopDetailsWrapper: 'ml-8 min-w-[20rem]',
};

const CRUDLayout = ({ actions, mainInfo, shopDetails }: ICRUDLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        {actions}
        {mainInfo}
      </div>
      <div className={classes.shopDetailsWrapper}>{shopDetails}</div>
    </div>
  );
};

export default CRUDLayout;
