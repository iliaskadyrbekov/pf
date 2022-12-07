import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { ITicketOrderItem } from 'src/shared/interfaces/OrderItem';

export interface ITicketOrderItemsInfoRes {
  ticketOrderItems: ITicketOrderItem[];
}

export interface ITicketOrderItemsInfoVars {
  shopId?: string;
  filter: {
    shopId?: string;
    eventId?: string;
    strictDate?: {
      from: Date;
      to: Date;
    };
  };
}

export const TICKET_ORDER_ITEMS_INFO = gql`
  query TicketOrderItemsInfo($filter: TicketOrderItemsFilterInput!, $shopId: ObjectId!) {
    ticketOrderItems(filter: $filter, shopId: $shopId) {
      id
      date
      dateEnd
      shortId
      isRegistered
      pricing {
        name {
          lang
          value
          country
        }
        price
      }
      checkoutForm {
        type
        name {
          lang
          value
          country
        }
        ... on OrderItemCheckoutCommonField {
          value
        }
        ... on OrderItemCheckoutCalendarField {
          dateValue: value
        }
      }

      order {
        id
        shortId
        note
        buyer {
          fullName
        }

        payment {
          currency {
            symbolNative
          }
        }
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

export const useTicketOrderItemsInfoQuery = (
  options: QueryHookOptions<ITicketOrderItemsInfoRes, ITicketOrderItemsInfoVars>,
) => {
  return useQuery<ITicketOrderItemsInfoRes, ITicketOrderItemsInfoVars>(TICKET_ORDER_ITEMS_INFO, options);
};
