import { gql, useMutation } from '@apollo/client';

import { MultiLanguageField } from 'src/shared/interfaces';
import { IAreaResource } from 'src/shared/interfaces/AreaResource';

export interface IUpdateAreaResourceRes {
  updateAreaResource: IAreaResource;
}

export interface IUpdateAreaResourceInput {
  id: string;
  name?: MultiLanguageField[];
  category?: string;
  group?: string;
  SKU?: string;
}

export interface IUpdateAreaResourceVars {
  shopId?: string;
  updateAreaResourceInput: IUpdateAreaResourceInput;
}

export const UPDATE_RESOURCE = gql`
  mutation UpdateAreaResource($shopId: ObjectId!, $updateAreaResourceInput: UpdateAreaResourceInput!) {
    updateAreaResource(shopId: $shopId, updateAreaResourceInput: $updateAreaResourceInput) {
      id
      name {
        value
        lang
        country
      }
      SKU
      group {
        name
      }
      category {
        id
        name
      }
    }
  }
`;

export const useUpdateAreaResource = () => {
  const [mutate, { data, loading, error }] = useMutation<IUpdateAreaResourceRes, IUpdateAreaResourceVars>(
    UPDATE_RESOURCE,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            resources(existingItems = []) {
              cache.writeFragment({
                data: data?.updateAreaResource,
                fragment: gql`
                  fragment ResourceFields on Resource {
                    id
                    name {
                      value
                      lang
                      country
                    }
                    SKU
                    group {
                      name
                    }
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
    },
  );

  return { mutate, data, loading, error };
};
