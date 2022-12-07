import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { IOrder } from 'src/shared/interfaces/Order';

export interface ICreateOrderItemsRes {
  createOrderItems: IOrder;
}

export interface ICreateOrderItemsVars {
  orderInfoInput: { orderId?: string; shopId?: string };
  input: ICreateOrderItemsInput[];
}

export interface ICreateOrderItemsInput {
  pricing: string;
  date: Date;
  event: string;
}

export const CREATE_ORDER_ITEMS = gql`
  mutation CreateOrderItems($input: [CreateOrderItemInputDto!]!, $orderInfoInput: OrderInfoInput!) {
    createOrderItems(input: $input, orderInfoInput: $orderInfoInput) {
      id
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
        }
      }
    }
  }
`;

export const useCreateOrderItems = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateOrderItemsRes, ICreateOrderItemsVars>(
    CREATE_ORDER_ITEMS,
  );

  return { mutate, data, loading, error };
};
