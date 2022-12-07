import gql from 'graphql-tag';

export const SHOP_PREFERENCES_FIELDS = gql`
  fragment ShopPreferencesFields on ShopPreferences {
    id
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
    homepageHeadImage
  }
`;
