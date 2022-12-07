import { gql, useQuery } from '@apollo/client';

import { IAreaResource } from 'src/shared/interfaces/AreaResource';

export interface IAreaResourcesRes {
  areaResources: IAreaResource[];
}

export interface IAreaResourcesVars {
  shopId?: string;
}

export const AREA_RESOURCES = gql`
  query AreaResources($shopId: ObjectId!) {
    areaResources(shopId: $shopId) {
      id
      type
      name {
        lang
        value
        country
      }

      ... on AreaResource {
        SKU
        group {
          id
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

export const useAreaResourcesQuery = (variables: IAreaResourcesVars) => {
  return useQuery<IAreaResourcesRes, IAreaResourcesVars>(AREA_RESOURCES, { variables });
};
