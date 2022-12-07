import { gql, useQuery } from '@apollo/client';
import { IAvailabilityResourceMeta } from 'src/shared/interfaces/AvailabilityResource';

export interface IAvailabilityResourceMetaRes {
  availabilityResourceMeta: IAvailabilityResourceMeta;
}

export const AVAILABILITY_RESOURCE_META = gql`
  query AvailabilityResourceMeta {
    availabilityResourceMeta {
      fields {
        category {
          options {
            id
            name
            group
            groupName
          }
        }
      }
    }
  }
`;

export const useAvailabilityResourceMetaQuery = () => {
  return useQuery<IAvailabilityResourceMetaRes>(AVAILABILITY_RESOURCE_META);
};
