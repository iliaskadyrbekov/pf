import * as React from 'react';

import { IShop } from 'src/shared/interfaces/Shop';

interface IShopProviderProps {
  shop: IShop | null;
  children: React.ReactNode;
}

export const ShopContext = React.createContext<{ shop: IShop | null }>({ shop: null });

export const ShopProvider = ({ shop, children }: IShopProviderProps) => {
  return <ShopContext.Provider value={{ shop }}>{children}</ShopContext.Provider>;
};
