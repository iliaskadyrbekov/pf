import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { IDiscount } from 'src/shared/interfaces/Discount';
import { IOrderItem } from 'src/shared/interfaces/OrderItem';

export interface IUpdateOrderItemRes {
  updateOrderItem: IOrderItem;
}

export interface IUpdateOrderItemVars {
  shopId?: string;

  input: {
    id: string;
    discount?: IDiscount;
  };
}

export const UPDATE_ORDER_ITEM = gql`
  mutation UpdateOrderItem($input: UpdateOrderItemInput!, $shopId: ObjectId!) {
    updateOrderItem(input: $input, shopId: $shopId) {
      orderItem {
        ... on RentalOrderItem {
          id
          discount {
            value
            type
          }
        }
        ... on TicketOrderItem {
          id
          discount {
            value
            type
          }
        }
        ... on GiftCardOrderItem {
          id
          discount {
            value
            type
          }
        }
        ... on AccommodationOrderItem {
          id
          discount {
            value
            type
          }
        }
      }
    }
  }
`;

export const useUpdateOrderItem = () => {
  const [mutate, { data, loading, error }] = useMutation<IUpdateOrderItemRes, IUpdateOrderItemVars>(UPDATE_ORDER_ITEM);

  return { mutate, data, loading, error };
};
