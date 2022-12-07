import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { ICustomPage } from 'src/shared/interfaces/CustomPage';

export interface IListPageRes {
  listPage: ICustomPage[];
}

export interface IListPageVars {
  shopId?: string;
  withDraft?: boolean;
}

export const LIST_PAGE = gql`
  query ListPage($shopId: ObjectId!, $withDraft: Boolean) {
    listPage(shopId: $shopId, withDraft: $withDraft) {
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

export const useListPageQuery = (vars: IListPageVars) => {
  return useQuery<IListPageRes, IListPageVars>(LIST_PAGE, { variables: vars, fetchPolicy: 'network-only' }); // TODO remove fetchPolicy: 'network-only'
};
