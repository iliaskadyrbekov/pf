import { gql, useMutation } from '@apollo/client';

import { MultiLanguageField } from 'src/shared/interfaces';
import { IAvailabilityResource } from 'src/shared/interfaces/AvailabilityResource';

export interface IUpdateAvailabilityResourceRes {
  updateAvailabilityResource: IAvailabilityResource;
}

export interface IUpdateAvailabilityResourceInput {
  id: string;
  name?: MultiLanguageField[];
  category?: string;
  availability: number;
  SKU?: string;
}

export interface IUpdateAvailabilityResourceVars {
  shopId?: string;
  updateAvailabilityResourceInput: IUpdateAvailabilityResourceInput;
}

export const UPDATE_RESOURCE = gql`
  mutation UpdateAvailabilityResource(
    $shopId: ObjectId!
    $updateAvailabilityResourceInput: UpdateAvailabilityResourceInput!
  ) {
    updateAvailabilityResource(shopId: $shopId, updateAvailabilityResourceInput: $updateAvailabilityResourceInput) {
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

export const useUpdateAvailabilityResource = () => {
  const [mutate, { data, loading, error }] = useMutation<
    IUpdateAvailabilityResourceRes,
    IUpdateAvailabilityResourceVars
  >(UPDATE_RESOURCE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          resources(existingItems = []) {
            cache.writeFragment({
              data: data?.updateAvailabilityResource,
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

            return existingItems;
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
