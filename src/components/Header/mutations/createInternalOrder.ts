import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

export interface ICreateInternalOrderRes {
  createInternalOrder: {
    id: string;
  };
}

export interface ICreateInternalOrderVars {
  shopId?: string;
}

export const CREATE_INTERNAL_ORDER = gql`
  mutation CreateInternalOrder($shopId: ObjectId!) {
    createInternalOrder(shopId: $shopId) {
      id
    }
  }
`;

export const useCreateInternalOrder = () => {
  const [mutate, { data, error, loading }] = useMutation<ICreateInternalOrderRes, ICreateInternalOrderVars>(
    CREATE_INTERNAL_ORDER,
  );
  return { mutate, data, error, loading };
};
