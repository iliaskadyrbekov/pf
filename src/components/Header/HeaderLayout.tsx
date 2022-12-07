import React from 'react';

interface IHeaderLayoutProps {
  logo: React.ReactNode;
  chooseShop: React.ReactNode;
  newOrder: React.ReactNode;
  actions: React.ReactNode[];
}

const classes = {
  wrapper: 'flex items-center justify-between py-5 px-8 bg-white w-full h-16',
  logoWrapper: 'flex items-center justify-center w-16 h-4',
  left: 'flex items-center h-full space-x-8',
  right: 'flex items-center space-x-6',
};

const HeaderLayout: React.FC<IHeaderLayoutProps> = ({ logo, chooseShop, newOrder, actions }: IHeaderLayoutProps) => {
  return (
    <div className={classes.wrapper} style={{ boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.05)' }}>
      <div className={classes.left}>
        {logo && <div className={classes.logoWrapper}>{logo}</div>}
        {chooseShop}
        {newOrder}
      </div>
      <div className={classes.right}>{actions}</div>
    </div>
  );
};

export default HeaderLayout;
