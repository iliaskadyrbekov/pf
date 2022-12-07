import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { INews } from 'src/shared/interfaces/News';

export interface IListNewsRes {
  listNews: INews[];
}

export interface IListNewsVars {
  shopId?: string;
  withDraft?: boolean;
}

export const LIST_NEWS = gql`
  query ListNews($shopId: ObjectId!, $withDraft: Boolean) {
    listNews(shopId: $shopId, withDraft: $withDraft) {
      id
      headImage
      name {
        lang
        value
        country
      }
      createdAt
      tags
      visibility {
        id
        label
      }
    }
  }
`;

export const useListNewsQuery = (vars: IListNewsVars) => {
  return useQuery<IListNewsRes, IListNewsVars>(LIST_NEWS, { variables: vars, fetchPolicy: 'network-only' }); // TODO remove fetchPolicy: 'network-only'
};
