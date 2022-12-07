import { gql, useQuery } from '@apollo/client';
import { IActivity } from 'src/shared/interfaces/Activity';

export interface IActivitiesWithArchivedVars {
  shopId?: string;
}

export interface IActivitiesWithArchivedRes {
  activitiesWithArchived: IActivity[];
}

export const ACTIVITIES_WITH_ARCHIVED = gql`
  query ActivitiesWithArchived($shopId: String!) {
    activitiesWithArchived(shopId: $shopId, withDraft: true) {
      id
      order
      type
      name {
        lang
        value
        country
      }
    }
  }
`;

export const useActivitiesWithArchivedQuery = (vars: IActivitiesWithArchivedVars) => {
  return useQuery<IActivitiesWithArchivedRes, IActivitiesWithArchivedVars>(ACTIVITIES_WITH_ARCHIVED, {
    variables: vars,
  });
};
