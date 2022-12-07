import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { TProduct } from 'src/shared/interfaces/Product';
import { PRODUCT_FIELDS } from '../../fragments/product';

export interface IProductVars {
  id?: string;
  shopId?: string;
}

export interface IProductRes {
  product: TProduct;
}

export const PRODUCT = gql`
  ${PRODUCT_FIELDS}
  query Product($id: ObjectId!, $shopId: ObjectId!) {
    product(id: $id, shopId: $shopId) {
      ...ProductFields
    }
  }
`;

export const useProductQuery = (vars: IProductVars) => {
  return useQuery<IProductRes, IProductVars>(PRODUCT, { variables: vars });
};
