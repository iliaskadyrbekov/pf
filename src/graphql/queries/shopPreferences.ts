import { gql } from '@apollo/client';
import { IShopPreferences } from 'src/shared/interfaces/ShopPreferences';

export interface IShopPreferencesVars {
  shopId?: string;
}

export interface IShopPreferencesRes {
  shopPreferences: IShopPreferences;
}

export const SHOP_PREFERENCES = gql`
  query ShopPreferences($shopId: ObjectId!) {
    shopPreferences(shopId: $shopId) {
      id
      homepageHeadImage
      homepageTitle {
        lang
        value
        country
      }
      homepageDescription {
        lang
        value
        country
      }
      locationEnabled
      location {
        lat
        lng
      }
      newsEnabled
    }
  }
`;
