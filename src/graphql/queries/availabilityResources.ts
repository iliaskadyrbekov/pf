import { gql, useQuery } from '@apollo/client';

import { IAvailabilityResource } from 'src/shared/interfaces/AvailabilityResource';

export interface IAvailabilityResourcesRes {
  availabilityResources: IAvailabilityResource[];
}

export interface IAvailabilityResourcesVars {
  shopId?: string;
}

export const AVAILABILITY_RESOURCES = gql`
  query AvailabilityResources($shopId: ObjectId!) {
    availabilityResources(shopId: $shopId) {
      id
      type
      name {
        lang
        value
        country
      }

      SKU
      availability
      category {
        name
      }
    }
  }
`;

export const useAvailabilityResourcesQuery = (variables: IAvailabilityResourcesVars) => {
  return useQuery<IAvailabilityResourcesRes, IAvailabilityResourcesVars>(AVAILABILITY_RESOURCES, { variables });
};
