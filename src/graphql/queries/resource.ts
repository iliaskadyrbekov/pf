import { gql, useQuery } from '@apollo/client';

import { TResource } from 'src/shared/interfaces';

export interface IResourceRes {
  resource: TResource;
}

export interface IResourceVars {
  shopId?: string;
  id: string;
}

export const RESOURCE = gql`
  query Resource($shopId: ObjectId!, $id: ObjectId!) {
    resource(shopId: $shopId, id: $id) {
      id
      name {
        lang
        value
        country
      }
      type

      ... on AvailabilityResource {
        SKU
        availability
        category {
          id
          name
        }
      }

      ... on AreaResource {
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
  }
`;

export const useResourceQuery = (variables: IResourceVars) => {
  return useQuery<IResourceRes, IResourceVars>(RESOURCE, { variables });
};
