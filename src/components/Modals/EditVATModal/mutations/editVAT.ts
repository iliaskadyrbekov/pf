import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

import { ShopContext } from 'src/context/ShopContext';
import { IVAT } from 'src/shared/interfaces/Shop';

export interface IEditVATsRes {
  editVAT: IVAT;
}

export interface IEditVATInput {
  id: string;
  value: number;
}

export interface IEditVATVars {
  shopId?: string;
  input: IEditVATInput;
}

export const EDIT_VAT = gql`
  mutation EditVAT($shopId: ObjectId!, $input: EditVATInput!) {
    editVAT(shopId: $shopId, input: $input) {
      value
      id
    }
  }
`;

export const useEditVAT = () => {
  const { shop } = React.useContext(ShopContext);

  const [mutate, { data, loading, error }] = useMutation<IEditVATsRes, IEditVATVars>(EDIT_VAT, {
    update(cache, { data }) {
      if (!data) {
        return;
      }

      cache.modify({
        id: `Shop:${shop?.id}`,
        fields: {
          VATs(existingItems = []) {
            cache.writeFragment({
              data: data.editVAT,
              fragment: gql`
                fragment VATFields on VAT {
                  id
                  value
                }
              `,
            });

            return existingItems;
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
