import { gql } from '@apollo/client';
import { IShop } from 'src/shared/interfaces/Shop';

export interface IEditShopVars {
  shopId: string;
  language: {
    defaultLanguage: {
      language: string;
      country: string;
    };
    availableLanguages: {
      language: string;
      country: string;
    }[];
  };
}

export interface IEditShop {
  editShop: IShop;
}

export const EDIT_SHOP = gql`
  mutation EditShop($language: ShopLanguageInput, $shopId: String!) {
    editShop(language: $language, shopId: $shopId) {
      id
    }
  }
`;
