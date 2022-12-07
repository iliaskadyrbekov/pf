import { gql } from '@apollo/client';

interface IOption {
  label: string;
  id: string;
}

export interface IShopProfileOptions {
  shopProfileOptions: {
    sellingOptions: IOption[];
    revenueOptions: IOption[];
    industryOptions: IOption[];
  };
}

export const SHOP_PROFILE_OPTIONS = gql`
  query ShopProfileOptions {
    shopProfileOptions {
      sellingOptions {
        label
        id
      }
      revenueOptions {
        label
        id
      }
      industryOptions {
        label
        id
      }
    }
  }
`;
