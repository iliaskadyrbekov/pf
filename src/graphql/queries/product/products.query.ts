import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { TProduct } from 'src/shared/interfaces/Product';

export interface IProductsVars {
  shopId?: string;
  activityId?: string;
}

export interface IProductsRes {
  products: TProduct[];
}

export const PRODUCTS = gql`
  query Products($shopId: ObjectId!, $activityId: ObjectId!) {
    products(shopId: $shopId, withDraft: true, activityId: $activityId) {
      visibility {
        id
        label
      }
      id
      type
      name {
        lang
        value
        country
      }
      order

      ... on TicketProduct {
        pricing {
          price
        }
      }
      ... on RentalProduct {
        category {
          id
        }
        pricing {
          price
        }
      }
      ... on GiftCardProduct {
        pricing {
          price
        }
      }
      ... on AccommodationProduct {
        accommodationPricing: pricing {
          price
        }
      }
    }
  }
`;

export const useProductsQuery = (options?: QueryHookOptions) => {
  return useQuery<IProductsRes, IProductsVars>(PRODUCTS, options);
};
