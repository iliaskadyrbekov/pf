import { gql, useQuery } from '@apollo/client';

import { IGiftCardProduct } from 'src/shared/interfaces/Product';

export interface IGiftCardProductsRes {
  giftCardProducts: IGiftCardProduct[];
}

export interface IGiftCardVars {
  activityId: string;
}

export const GIFT_CARD_PRODUCTS = gql`
  query GiftCardProducts($activityId: ObjectId!) {
    giftCardProducts(activityId: $activityId) {
      id
      type
      name {
        lang
        value
        country
      }
      shortDescription {
        lang
        value
        country
      }
      pricing {
        id
        price
      }
    }
  }
`;

export const useGiftCardProductsQuery = (vars: IGiftCardVars) => {
  return useQuery<IGiftCardProductsRes, IGiftCardVars>(GIFT_CARD_PRODUCTS, {
    variables: vars,
  });
};
