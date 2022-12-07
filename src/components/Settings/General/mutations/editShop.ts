import { gql } from '@apollo/client';
import { IShop } from 'src/shared/interfaces/Shop';

interface IProfile {
  VAT?: string;
  legalBusinessName?: string;
  streetAndHouseNumber?: string;
  apartment?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  website?: string;
  contactEmail?: string;
  senderEmail?: string;
}

export interface IEditShopVars {
  shopId: string;
  currency?: string;
  country?: string;
  logo?: string;
  timezone?: string;
  profile?: IProfile;
}

export interface IEditShop {
  editShop: IShop;
}

export const EDIT_SHOP = gql`
  mutation EditShop(
    $currency: String
    $country: String
    $timezone: String!
    $logo: String
    $shopId: String!
    $profile: EditShopProfileDTO
  ) {
    editShop(
      currency: $currency
      country: $country
      shopId: $shopId
      logo: $logo
      timezone: $timezone
      profile: $profile
    ) {
      id
    }
  }
`;
