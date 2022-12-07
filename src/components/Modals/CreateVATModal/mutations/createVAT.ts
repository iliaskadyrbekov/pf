import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

import { ShopContext } from 'src/context/ShopContext';
import { IVAT } from 'src/shared/interfaces/Shop';

export interface ICreateVATsRes {
  createVAT: IVAT;
}

export interface ICreateVATInput {
  value: number;
}

export interface ICreateVATVars {
  shopId?: string;
  input: ICreateVATInput;
}

export const CREATE_VAT = gql`
  mutation CreateVAT($shopId: ObjectId!, $input: CreateVATInput!) {
    createVAT(shopId: $shopId, input: $input) {
      value
      id
    }
  }
`;

export const useCreateVAT = () => {
  const { shop } = React.useContext(ShopContext);

  const [mutate, { data, loading, error }] = useMutation<ICreateVATsRes, ICreateVATVars>(CREATE_VAT, {
    update(cache, { data }) {
      if (!data) {
        return;
      }

      cache.modify({
        id: `Shop:${shop?.id}`,
        fields: {
          VATs(existingItems = []) {
            const newItemsRef = cache.writeFragment({
              data: data.createVAT,
              fragment: gql`
                fragment VATFields on VAT {
                  id
                  value
                }
              `,
            });

            return [...existingItems, newItemsRef];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
