import { gql, useMutation } from '@apollo/client';
import { SHOP_PREFERENCES_FIELDS } from 'src/graphql/fragments/shopPreferences';

import { IShopPreferences } from 'src/shared/interfaces/ShopPreferences';

export interface IEditShopPreferencesVars extends Partial<IShopPreferences> {
  shopId?: string;
}

export interface IEditShopPreferencesRes {
  editShopPreferences: IShopPreferences;
}

export const EDIT_SHOP_PREFERENCES = gql`
  mutation EditShopPreferences(
    $id: ObjectId
    $homepageTitle: [MultiLanguageFieldInput!]
    $homepageDescription: [MultiLanguageFieldInput!]
    $homepageHeadImage: String
    $location: LocationInput
    $locationEnabled: Boolean
    $shopId: ObjectId!
    $newsEnabled: Boolean
  ) {
    editShopPreferences(
      id: $id
      homepageTitle: $homepageTitle
      homepageDescription: $homepageDescription
      homepageHeadImage: $homepageHeadImage
      shopId: $shopId
      location: $location
      locationEnabled: $locationEnabled
      newsEnabled: $newsEnabled
    ) {
      ...ShopPreferencesFields
    }
  }
  ${SHOP_PREFERENCES_FIELDS}
`;

export const useEditShopPreferences = () => {
  const [mutate, { data, error, loading }] = useMutation<IEditShopPreferencesRes, IEditShopPreferencesVars>(
    EDIT_SHOP_PREFERENCES,
  );
  return { mutate, data, error, loading };
};
