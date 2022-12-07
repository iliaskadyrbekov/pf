import { gql, useLazyQuery } from '@apollo/client';
import { IAccommodationOrderItem } from 'src/shared/interfaces/OrderItem';

export interface IAccommodationOrderItemsRes {
  accommodationOrderItems: IAccommodationOrderItem[];
}

export interface IAccommodationOrderItemsVars {
  shopId?: string;
  filter: {
    shopId?: string;
    date?: {
      from: Date;
      to: Date;
    };
  };
}

export const ACCOMMODATION_ORDER_ITEMS = gql`
  query AccommodationOrderItems($filter: AccommodationOrderItemsFilterInput!, $shopId: ObjectId!) {
    accommodationOrderItems(filter: $filter, shopId: $shopId) {
      id
      date
      dateEnd

      order {
        paymentStatus
        buyer {
          fullName
        }
      }

      events {
        connectedResources {
          resource {
            id
          }
        }
      }

      resource {
        id
        name {
          lang
          value
          country
        }
        group {
          name
          id
        }
      }

      product {
        name {
          lang
          value
          country
        }
      }
    }
  }
`;

export const useAccommodationOrderItemsLazyQuery = () => {
  return useLazyQuery<IAccommodationOrderItemsRes, IAccommodationOrderItemsVars>(ACCOMMODATION_ORDER_ITEMS);
};
