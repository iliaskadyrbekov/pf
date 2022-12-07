import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { ITicketProductMetaFields } from 'src/shared/interfaces';

export interface ITicketProductMetaFieldsRes {
  ticketProductMetaFields: ITicketProductMetaFields;
}

export const TICKET_PRODUCT_META_FIELDS = gql`
  query TicketProductMetaFields {
    ticketProductMetaFields {
      visibility {
        options {
          id
          label
        }
      }
      availabilityType {
        options {
          value
          label
        }
      }
      durationType {
        options {
          value
          label
        }
      }
    }
  }
`;

export const useTicketProductMetaFields = () => {
  return useQuery<ITicketProductMetaFieldsRes>(TICKET_PRODUCT_META_FIELDS);
};
