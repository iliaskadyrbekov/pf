import { gql, useQuery } from '@apollo/client';
import { IActivity } from 'src/shared/interfaces/Activity';

export interface IActivitiesVars {
  shopId?: string;
}

export interface IActivitiesRes {
  activities: IActivity[];
}

export const ACTIVITIES = gql`
  query Activities($shopId: String!) {
    activities(shopId: $shopId, withDraft: true) {
      id
      order
      type
      headImage
      name {
        lang
        value
        country
      }
    }
  }
`;

export const useActivitiesQuery = (vars: IActivitiesVars) => {
  return useQuery<IActivitiesRes, IActivitiesVars>(ACTIVITIES, { variables: vars });
};
