import { gql, useMutation } from '@apollo/client';
import { MultiLanguageField } from 'src/shared/interfaces';

import { IAvailabilityResource } from 'src/shared/interfaces/AvailabilityResource';

export interface ICreateAvailabilityResourceRes {
  createAvailabilityResource: IAvailabilityResource;
}

export interface ICreateAvailabilityResourceInput {
  name: MultiLanguageField[];
  category: string;
  availability: number;
  SKU?: string;
}

export interface ICreateAvailabilityResourceVars {
  shopId?: string;
  createAvailabilityResourceInput: ICreateAvailabilityResourceInput;
}

export const CREATE_RESOURCE = gql`
  mutation CreateAvailabilityResource(
    $shopId: ObjectId!
    $createAvailabilityResourceInput: CreateAvailabilityResourceInput!
  ) {
    createAvailabilityResource(shopId: $shopId, createAvailabilityResourceInput: $createAvailabilityResourceInput) {
      id
      name {
        value
        lang
        country
      }
      availability
      SKU
      category {
        id
        name
      }
    }
  }
`;

export const useCreateAvailabilityResource = () => {
  const [mutate, { data, loading, error }] = useMutation<
    ICreateAvailabilityResourceRes,
    ICreateAvailabilityResourceVars
  >(CREATE_RESOURCE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          resources(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.createAvailabilityResource,
              fragment: gql`
                fragment ResourceFields on Resource {
                  id
                  name {
                    value
                    lang
                    country
                  }
                  availability
                  SKU
                  category {
                    id
                    name
                  }
                }
              `,
            });

            return [...existingItems, newItemRef];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
