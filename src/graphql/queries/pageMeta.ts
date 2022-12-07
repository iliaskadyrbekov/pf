import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { ICustomPageMeta } from 'src/shared/interfaces/CustomPage';

export interface IPageMetaRes {
  pageMeta: ICustomPageMeta;
}

export const PAGE_META = gql`
  query PageMeta {
    pageMeta {
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

export const usePageMetaQuery = () => {
  return useQuery<IPageMetaRes>(PAGE_META);
};
