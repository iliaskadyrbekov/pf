import { gql } from '@apollo/client';
import { IOrder } from 'src/shared/interfaces/Order';

export type IOrdersRes = {
  orders: IOrder[];
};

export interface IOrdersVars {
  shopId?: string;
}

export const ORDERS = gql`
  query Orders($shopId: ObjectId!) {
    orders(shopId: $shopId) {
      id
      shortId
      createdFrom
      buyer {
        fullName
        phone
        email
      }
      paymentStatus
      payment {
        id
        amount
        created
        currency {
          symbolNative
        }
      }
      status
      orderItems {
        orderItem {
          ... on GiftCardOrderItem {
            discount {
              value
              type
            }
            pricing {
              name {
                value
                lang
                country
              }
              price
            }
          }
          ... on TicketOrderItem {
            discount {
              value
              type
            }
            pricing {
              name {
                value
                lang
                country
              }
              price
            }
          }
          ... on RentalOrderItem {
            discount {
              value
              type
            }
            pricing {
              price
            }
          }
          ... on AccommodationOrderItem {
            discount {
              value
              type
            }
            pricing {
              price
            }
          }
        }
      }
    }
  }
`;
