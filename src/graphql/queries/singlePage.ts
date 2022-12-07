import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { ICustomPage } from 'src/shared/interfaces/CustomPage';

export interface ISinglePageRes {
  singlePage: ICustomPage;
}

export interface ISinglePageVars {
  id: string;
  shopId?: string;
  withDraft?: boolean;
}

export const SINGLE_PAGE = gql`
  query SinglePage($id: ObjectId!, $shopId: ObjectId!, $withDraft: Boolean) {
    singlePage(id: $id, shopId: $shopId, withDraft: $withDraft) {
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

export const useSinglePageQuery = (vars: ISinglePageVars) => {
  return useQuery<ISinglePageRes, ISinglePageVars>(SINGLE_PAGE, { variables: vars });
};
