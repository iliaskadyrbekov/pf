import { gql, useMutation } from '@apollo/client';
import { MultiLanguageField } from 'src/shared/interfaces';

import { IAreaResource } from 'src/shared/interfaces/AreaResource';

export interface ICreateAreaResourceRes {
  createAreaResource: IAreaResource;
}

export interface ICreateAreaResourceInput {
  name: MultiLanguageField[];
  category: string;
  group?: string;
  SKU?: string;
}

export interface ICreateAreaResourceVars {
  shopId?: string;
  createAreaResourceInput: ICreateAreaResourceInput;
}

export const CREATE_RESOURCE = gql`
  mutation CreateAreaResource($shopId: ObjectId!, $createAreaResourceInput: CreateAreaResourceInput!) {
    createAreaResource(shopId: $shopId, createAreaResourceInput: $createAreaResourceInput) {
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

export const useCreateAreaResource = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateAreaResourceRes, ICreateAreaResourceVars>(
    CREATE_RESOURCE,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            resources(existingItems = []) {
              const newItemRef = cache.writeFragment({
                data: data?.createAreaResource,
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

              return [...existingItems, newItemRef];
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
