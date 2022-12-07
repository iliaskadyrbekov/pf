import { gql } from '@apollo/client';
import { IOrder } from 'src/shared/interfaces/Order';

export type IOrderRes = {
  order: IOrder;
};

export interface IOrderVars {
  id: string;
}

export const ORDER = gql`
  query Order($id: ObjectId!) {
    order(id: $id) {
      id
      shortId
      buyer {
        fullName
        phone
        email
      }
      paymentStatus
      status
      orderItems {
        orderItem {
          ... on TicketOrderItem {
            id
            pricing {
              name {
                value
                lang
              }
              price
            }
            type
            date
            status
            paymentStatus
            purchased
            assignee {
              fullName
              phone
              email
            }
          }
          ... on GiftCardOrderItem {
            id
            pricing {
              name {
                value
                lang
              }
              price
            }
            type
            status
            paymentStatus
            purchased
            assignee {
              fullName
              phone
              email
            }
            product {
              id
              type
              name {
                lang
                value
              }
            }
          }
          ... on RentalOrderItem {
            id
            event {
              id
              product {
                id
                type
                name {
                  lang
                  value
                }
              }
            }
            pricing {
              id
              name {
                value
                lang
              }
              price
            }
            type
            date
            status
            paymentStatus
            purchased
            assignee {
              fullName
              phone
              email
            }
          }
        }
        event {
          event {
            ... on OneTimeEvent {
              allDay
              id
            }
            ... on RecurringEvent {
              allDay
              id
            }
          }
        }
      }
    }
  }
`;
