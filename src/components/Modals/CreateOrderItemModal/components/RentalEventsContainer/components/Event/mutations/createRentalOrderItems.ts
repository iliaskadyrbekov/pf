import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { IOrder } from 'src/shared/interfaces/Order';

export interface ICreateRentalOrderItemsInput {
  date: Date;
  event: string;
  pricing: string;
}

export interface ICreateRentalOrderItemsRes {
  createRentalOrderItems: IOrder;
}

export interface ICreateRentalOrderItemsVars {
  input: ICreateRentalOrderItemsInput[];
  orderInfoInput: {
    orderId?: string;
    shopId?: string;
  };
}

// TODO remove this endpoint and takes data from CreateOrderItems

export const CREATE_RENTAL_ORDER_ITEMS = gql`
  mutation CreateRentalOrderItems($input: [CreateRentalOrderItemInputDto!]!, $orderInfoInput: OrderInfoInput!) {
    createRentalOrderItems(input: $input, orderInfoInput: $orderInfoInput) {
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

export const useCreateRentalOrderItems = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateRentalOrderItemsRes, ICreateRentalOrderItemsVars>(
    CREATE_RENTAL_ORDER_ITEMS,
  );

  return { mutate, data, loading, error };
};
