import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { IOrder } from 'src/shared/interfaces/Order';

export interface IKeepOrderOpenRes {
  keepOrderOpen: IOrder;
}

export interface IKeepOrderOpenVars {
  shopId?: string;
  input: {
    orderId: string;
    note?: string;
    buyer?: {
      fullName: string;
      email: string;
      phone: string;
      companyName?: string;
      address?: string;
    };
  };
}

export const KEEP_ORDER_OPEN = gql`
  mutation KeepOrderOpen($input: KeepOrderOpenInput!, $shopId: ObjectId!) {
    keepOrderOpen(input: $input, shopId: $shopId) {
      id
      status
      note
      buyer {
        fullName
        email
        phone
        companyName
      }
    }
  }
`;

export const useKeepOrderOpen = () => {
  const [mutate, { data, loading, error }] = useMutation<IKeepOrderOpenRes, IKeepOrderOpenVars>(KEEP_ORDER_OPEN, {
    update(cache, { data }) {
      if (data?.keepOrderOpen) {
        cache.modify({
          id: cache.identify(data.keepOrderOpen as any),
          fields: {
            note() {
              return data?.keepOrderOpen.note;
            },
            buyer() {
              return data?.keepOrderOpen.buyer;
            },
            status() {
              return data?.keepOrderOpen.status;
            },
          },
        });
      }
    },
  });

  return { mutate, data, loading, error };
};
