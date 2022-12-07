import { gql, useLazyQuery } from '@apollo/client';
import { ITicketOrderItem } from 'src/shared/interfaces/OrderItem';

export interface ITicketOrderItemsRes {
  ticketOrderItems: ITicketOrderItem[];
}

export interface ITicketOrderItemsVars {
  shopId?: string;
  filter: {
    shopId?: string;
    eventId?: string;
    date?: {
      from: Date;
      to: Date;
    };
  };
}

export const TICKET_ORDER_ITEMS = gql`
  query TicketOrderItems($filter: TicketOrderItemsFilterInput!, $shopId: ObjectId!) {
    ticketOrderItems(filter: $filter, shopId: $shopId) {
      id
      date
      dateEnd

      order {
        paymentStatus
      }

      event {
        id
        availability

        product {
          id
          name {
            lang
            value
            country
          }

          activity {
            id
            name {
              lang
              value
              country
            }
          }
        }
      }
    }
  }
`;

export const useTicketOrderItemsLazyQuery = () => {
  return useLazyQuery<ITicketOrderItemsRes, ITicketOrderItemsVars>(TICKET_ORDER_ITEMS);
};
