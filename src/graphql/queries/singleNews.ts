import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { INews } from 'src/shared/interfaces/News';

export interface ISingleNewsRes {
  singleNews: INews;
}

export interface ISingleNewsVars {
  id: string;
  shopId?: string;
  withDraft?: boolean;
}

export const SINGLE_NEWS = gql`
  query SingleNews($id: ObjectId!, $shopId: ObjectId!, $withDraft: Boolean) {
    singleNews(id: $id, shopId: $shopId, withDraft: $withDraft) {
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
      content {
        ... on ImageContent {
          order
          type
          url
        }
        ... on TextContent {
          order
          text {
            lang
            value
            country
          }
          type
        }
        ... on VideoContent {
          order
          type
          url
        }
      }
      headImage
      tags
      visibility {
        id
        label
      }
    }
  }
`;

export const useSingleNewsQuery = (vars: ISingleNewsVars) => {
  return useQuery<ISingleNewsRes, ISingleNewsVars>(SINGLE_NEWS, { variables: vars });
};
