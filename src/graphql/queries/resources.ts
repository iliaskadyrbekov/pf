import { gql, useQuery } from '@apollo/client';

import { TResource } from 'src/shared/interfaces';

export interface IResourcesRes {
  resources: TResource[];
}

export interface IResourcesVars {
  shopId?: string;
}

export const RESOURCES = gql`
  query Resources($shopId: ObjectId!) {
    resources(shopId: $shopId) {
      id
      type
      name {
        lang
        value
        country
      }

      ... on AvailabilityResource {
        SKU
        availability
        category {
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

export const useResourcesQuery = (variables: IResourcesVars) => {
  return useQuery<IResourcesRes, IResourcesVars>(RESOURCES, { variables });
};
