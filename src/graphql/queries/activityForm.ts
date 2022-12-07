import { gql, useQuery } from '@apollo/client';

import { IActivity } from 'src/shared/interfaces/Activity';

interface IVisibilityOption {
  id: string;
  value: string;
  label: string;
}

export interface IActivityFormVars {
  id?: string;
  shopId?: string;
}

export interface IActivityFormRes {
  activityForm: {
    data: IActivity;
    meta: {
      fields: {
        visibility: {
          options: IVisibilityOption[];
        };
      };
    };
  };
}

export const ACTIVITY_FORM = gql`
  query ActivityForm($id: String!, $shopId: String!) {
    activityForm(id: $id, shopId: $shopId) {
      data {
        icon
        id
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
        type
        visibility {
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
        ... on ActivityWithLocation {
          locationEnabled
          location {
            lat
            lng
          }
        }
        ... on AccommodationActivity {
          specificationFilterEnabled
          specificationFilter {
            type
            order
          }
        }
      }
      meta {
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
  }
`;

export const useActivityFormQuery = (vars: IActivityFormVars) => {
  return useQuery<IActivityFormRes, IActivityFormVars>(ACTIVITY_FORM, { variables: vars });
};
