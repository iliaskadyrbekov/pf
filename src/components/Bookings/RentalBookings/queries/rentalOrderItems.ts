import { gql, useLazyQuery } from '@apollo/client';
import { IRentalOrderItem } from 'src/shared/interfaces/OrderItem';

export interface IRentalOrderItemsRes {
  rentalOrderItems: IRentalOrderItem[];
}

export interface IRentalOrderItemsVars {
  shopId?: string;
  filter: {
    shopId?: string;
    date?: {
      from: Date;
      to: Date;
    };
  };
}

export const RENTAL_ORDER_ITEMS = gql`
  query RentalOrderItems($filter: RentalOrderItemsFilterInput!, $shopId: ObjectId!) {
    rentalOrderItems(filter: $filter, shopId: $shopId) {
      id
      date
      dateEnd

      order {
        paymentStatus
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

export const useRentalOrderItemsLazyQuery = () => {
  return useLazyQuery<IRentalOrderItemsRes, IRentalOrderItemsVars>(RENTAL_ORDER_ITEMS);
};
