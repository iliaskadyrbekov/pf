import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { IActivity } from 'src/shared/interfaces/Activity';

export interface IActivityVars {
  id?: string;
  shopId?: string;
}

export interface IActivityRes {
  activity: IActivity;
}

export const ACTIVITY = gql`
  query Activity($id: String!, $shopId: String!) {
    activity(id: $id, shopId: $shopId, withDraft: true) {
      id
      type
      name {
        lang
        value
        country
      }
      description {
        lang
        value
        country
      }
      visibility {
        label
        id
      }
      headImage
      content {
        ... on ImageContent {
          url
          order
          type
        }
        ... on VideoContent {
          url
          order
          type
        }
        ... on TextContent {
          text {
            lang
            value
            country
          }
          order
          type
        }
      }
    }
  }
`;

export const useActivityQuery = (options?: QueryHookOptions<IActivityRes, IActivityVars>) => {
  return useQuery<IActivityRes, IActivityVars>(ACTIVITY, options);
};
