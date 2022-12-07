import { gql, useQuery } from '@apollo/client';
import { IAreaResourceMeta } from 'src/shared/interfaces/AreaResource';

export interface IAreaResourceMetaVars {
  shopId?: string;
}

export interface IAreaResourceMetaRes {
  areaResourceMeta: IAreaResourceMeta;
}

export const AREA_RESOURCE_META = gql`
  query AreaResourceMeta($shopId: ObjectId!) {
    areaResourceMeta(shopId: $shopId) {
      fields {
        category {
          options {
            id
            name
            group
            groupName
          }
        }
        group {
          options {
            name
          }
        }
      }
    }
  }
`;

export const useAreaResourceMetaQuery = (vars: IAreaResourceMetaVars) => {
  return useQuery<IAreaResourceMetaRes, IAreaResourceMetaVars>(AREA_RESOURCE_META, { variables: vars });
};
