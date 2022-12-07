import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { IOrderItem } from 'src/shared/interfaces/OrderItem';

export interface IUpdateOrderRes {
  updateOrder: IOrderItem;
}

export interface IUpdateOrderVars {
  shopId?: string;

  input: {
    id: string;
    buyer?: {
      fullName: string;
      email: string;
      phone: string;
      companyName?: string;
    };
  };
}

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: UpdateOrderInput!, $shopId: ObjectId!) {
    updateOrder(input: $input, shopId: $shopId) {
      order {
        buyer {
          fullName
          email
          phone
          companyName
        }
      }
    }
  }
`;

export const useUpdateOrder = () => {
  const [mutate, { data, loading, error }] = useMutation<IUpdateOrderRes, IUpdateOrderVars>(UPDATE_ORDER);

  return { mutate, data, loading, error };
};
