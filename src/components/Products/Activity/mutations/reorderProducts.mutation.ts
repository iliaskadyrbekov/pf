import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { TProduct } from 'src/shared/interfaces/Product';

export interface IReorderProductsRes {
  reorderProducts: TProduct[];
}

export interface IReorderProductsVars {
  shopId?: string;
  input: {
    activityId: string;
    products: {
      id: string;
      order: number;
    }[];
  };
}

export const REORDER_PRODUCTS = gql`
  mutation ReorderProducts($shopId: ObjectId!, $input: ReorderProductsInput!) {
    reorderProducts(shopId: $shopId, input: $input) {
      id
      order
    }
  }
`;

export const useReorderProducts = () => {
  return useMutation<IReorderProductsRes, IReorderProductsVars>(REORDER_PRODUCTS, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          products() {
            const newItemsRef = data?.reorderProducts.map((product) =>
              cache.writeFragment({
                data: product,
                fragment: gql`
                  fragment ProductFields on Product {
                    order
                  }
                `,
              }),
            );

            return newItemsRef;
          },
        },
      });
    },
  });
};
