import { Reference, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

import { ShopContext } from 'src/context/ShopContext';
import { IVAT } from 'src/shared/interfaces/Shop';

export interface IDeleteVATRes {
  deleteVAT: IVAT;
}

export interface IDeleteVATInput {
  id: string;
}

export interface IDeleteVATVars {
  shopId?: string;
  input: IDeleteVATInput;
}

export const DELETE_VAT = gql`
  mutation DeleteVAT($shopId: ObjectId!, $input: DeleteVATInput!) {
    deleteVAT(shopId: $shopId, input: $input)
  }
`;

export const useDeleteVAT = () => {
  const { shop } = React.useContext(ShopContext);

  const [mutate, { data, loading, error }] = useMutation<IDeleteVATRes, IDeleteVATVars>(DELETE_VAT, {
    update(cache, { data }, { variables }) {
      if (!data) {
        return;
      }

      cache.modify({
        id: `Shop:${shop?.id}`,
        fields: {
          VATs(existingItems = [], { readField }) {
            return existingItems.filter((commentRef: Reference) => variables?.input.id !== readField('id', commentRef));
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
