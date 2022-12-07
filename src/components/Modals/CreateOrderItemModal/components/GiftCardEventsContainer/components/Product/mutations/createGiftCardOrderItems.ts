import gql from 'graphql-tag';

import { useMutation } from '@apollo/client';
import { IOrder } from 'src/shared/interfaces/Order';

export interface ICreateGiftCardOrderItemsInput {
  product: string;
  pricing: string;
}

export interface ICreateGiftCardOrderItemsRes {
  createGiftCardOrderItems: IOrder;
}

export interface ICreateGiftCardOrderItemsVars {
  input: ICreateGiftCardOrderItemsInput[];
  orderInfoInput: {
    orderId?: string;
    shopId?: string;
  };
}

// TODO remove this endpoint and takes data from CreateOrderItems

export const CREATE_GIFT_CARD_ORDER_ITEMS = gql`
  mutation CreateGiftCardOrderItems($input: [CreateGiftCardOrderItemInputDto!]!, $orderInfoInput: OrderInfoInput!) {
    createGiftCardOrderItems(input: $input, orderInfoInput: $orderInfoInput) {
      id
      status
      orderItems {
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

export const useCreateGiftCardOrderItems = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateGiftCardOrderItemsRes, ICreateGiftCardOrderItemsVars>(
    CREATE_GIFT_CARD_ORDER_ITEMS,
  );

  return { mutate, data, loading, error };
};
