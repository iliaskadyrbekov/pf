import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { INewsMeta } from 'src/shared/interfaces/News';

export interface INewsMetaRes {
  newsMeta: INewsMeta;
}

export const NEWS_META = gql`
  query NewsMeta {
    newsMeta {
      fields {
        visibility {
          options {
            id
            label
          }
        }
      }
    }
  }
`;

export const useNewsMetaQuery = () => {
  return useQuery<INewsMetaRes>(NEWS_META);
};
