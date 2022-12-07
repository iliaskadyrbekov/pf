import { gql } from '@apollo/client';

export interface ICreateShopProfileVars {
  input: {
    profile: {
      selling: string;
      revenue: string;
      industry: string;
      isForClient: boolean;
      legalBusinessName: string;
      streetAndHouseNumber: string;
      apartment: string;
      postalCode: string;
      city: string;
      phone: string;
      website: string;
      isBusiness: boolean;
      shopId?: string;
    };
    country: string;
    timezone: string;
  };
  shopId?: string;
}

export interface ICreateShopProfile {
  id: string;
}

export const CREATE_SHOP_PROFILE = gql`
  mutation ShopProfileOptions($input: CreateShopInput!, $shopId: String!) {
    createShopProfile(input: $input, shopId: $shopId) {
      id
    }
  }
`;
