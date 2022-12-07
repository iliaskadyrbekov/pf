import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { ActivityType } from 'src/shared/enums';
import { IActivity } from 'src/shared/interfaces/Activity';

export interface IActivitiesByTypeVars {
  shopId?: string;
  type: ActivityType;
}

export interface IActivitiesByTypeRes {
  activities: IActivity[];
}

export const ACTIVITIES_BY_TYPE = gql`
  query ActivitiesByType($shopId: String!, $type: ActivityType) {
    activities(shopId: $shopId, type: $type, withDraft: true) {
      id
      order
      name {
        lang
        value
        country
      }
    }
  }
`;

export const useActivitiesByTypeQuery = (options?: QueryHookOptions<IActivitiesByTypeRes, IActivitiesByTypeVars>) => {
  return useQuery<IActivitiesByTypeRes, IActivitiesByTypeVars>(ACTIVITIES_BY_TYPE, options);
};
