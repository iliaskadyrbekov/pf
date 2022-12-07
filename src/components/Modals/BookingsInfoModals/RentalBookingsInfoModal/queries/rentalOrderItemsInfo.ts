import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { IRentalOrderItem } from 'src/shared/interfaces/OrderItem';

export interface IRentalOrderItemsInfoRes {
  rentalOrderItems: IRentalOrderItem[];
}

export interface IRentalOrderItemsInfoVars {
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

export const RENTAL_ORDER_ITEMS_INFO = gql`
  query RentalOrderItemsInfo($filter: RentalOrderItemsFilterInput!, $shopId: ObjectId!) {
    rentalOrderItems(filter: $filter, shopId: $shopId) {
      id
      date
      dateEnd
      shortId
      checkIn
      checkOut
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
        quantity

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

export const useRentalOrderItemsInfoQuery = (
  options: QueryHookOptions<IRentalOrderItemsInfoRes, IRentalOrderItemsInfoVars>,
) => {
  return useQuery<IRentalOrderItemsInfoRes, IRentalOrderItemsInfoVars>(RENTAL_ORDER_ITEMS_INFO, options);
};
