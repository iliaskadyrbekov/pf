import React from 'react';

interface IOnlineShopSubMenuLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'w-72 flex-col px-5 pt-6 bg-white shadow divide-y divide-gray-200 overflow-auto',
};

const OnlineShopSubMenuLayout: React.FC<IOnlineShopSubMenuLayoutProps> = ({
  children,
}: IOnlineShopSubMenuLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default OnlineShopSubMenuLayout;
