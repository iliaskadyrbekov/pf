import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { IOrder } from 'src/shared/interfaces';

export interface ICreateAccommodationOrderItemsRes {
  createAccommodationOrderItems: IOrder;
}

export interface ICreateAccommodationOrderItemsVars {
  orderInfoInput: { orderId?: string; shopId?: string };
  input: ICreateAccommodationOrderItemsInput[];
}

export interface ICreateAccommodationOrderItemsInput {
  dateEnd: Date;
  dateStart: Date;
  product: string;
}

export const CREATE_ACCOMMODATION_ORDER_ITEMS = gql`
  mutation CreateAccommodationOrderItems(
    $input: [CreateAccommodationOrderItemInput!]!
    $orderInfoInput: OrderInfoInput!
  ) {
    createAccommodationOrderItems(input: $input, orderInfoInput: $orderInfoInput) {
      id
      status
      orderItems {
        event {
          event {
            ... on OneTimeEvent {
              id
            }
            ... on RecurringEvent {
              id
            }
          }
        }
        orderItem {
          ... on TicketOrderItem {
            id
            status
          }
          ... on RentalOrderItem {
            id
            status
          }
          ... on GiftCardOrderItem {
            id
            status
          }
          ... on AccommodationOrderItem {
            id
            status
          }
        }
      }
    }
  }
`;

export const useCreateAccommodationOrderItems = () => {
  const [mutate, { data, loading, error }] = useMutation<
    ICreateAccommodationOrderItemsRes,
    ICreateAccommodationOrderItemsVars
  >(CREATE_ACCOMMODATION_ORDER_ITEMS);

  return { mutate, data, loading, error };
};
