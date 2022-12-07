import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

export interface IDeleteOrderRes {
  deleteOrder: boolean;
}

export interface IDeleteOrderVars {
  shopId?: string;
  id: string;
}

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ObjectId!, $shopId: ObjectId!) {
    deleteOrder(id: $id, shopId: $shopId)
  }
`;

export const useDeleteOrder = () => {
  const [mutate, { data, loading, error }] = useMutation<IDeleteOrderRes, IDeleteOrderVars>(DELETE_ORDER);

  return { mutate, data, loading, error };
};
