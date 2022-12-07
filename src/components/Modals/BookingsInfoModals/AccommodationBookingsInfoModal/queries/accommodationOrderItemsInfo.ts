import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { IAccommodationOrderItem } from 'src/shared/interfaces/OrderItem';

export interface IAccommodationOrderItemsInfoRes {
  accommodationOrderItems: IAccommodationOrderItem[];
}

export interface IAccommodationOrderItemsInfoVars {
  shopId?: string;
  filter: {
    shopId?: string;
    id: string;
  };
}

export const ACCOMMODATION_ORDER_ITEMS_INFO = gql`
  query AccommodationOrderItemsInfo($filter: AccommodationOrderItemsFilterInput!, $shopId: ObjectId!) {
    accommodationOrderItems(filter: $filter, shopId: $shopId) {
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
`;

export const useAccommodationOrderItemsInfoQuery = (
  options: QueryHookOptions<IAccommodationOrderItemsInfoRes, IAccommodationOrderItemsInfoVars>,
) => {
  return useQuery<IAccommodationOrderItemsInfoRes, IAccommodationOrderItemsInfoVars>(
    ACCOMMODATION_ORDER_ITEMS_INFO,
    options,
  );
};
