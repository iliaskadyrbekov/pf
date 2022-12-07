import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { EOrderStatus } from 'src/shared/enums/OrderStatus';
import { TOrderHistoryEvent } from 'src/shared/interfaces/HistoryEvent';

export interface IReopenOrderRes {
  reopenOrder: {
    id: string;
    status: EOrderStatus;
    historyEvents: TOrderHistoryEvent[];
  };
}

export interface IReopenOrderVars {
  shopId?: string;
  input: { id: string };
}

export const REOPEN_ORDER = gql`
  mutation ReopenOrder($input: ReopenOrderInput!, $shopId: ObjectId!) {
    reopenOrder(input: $input, shopId: $shopId) {
      id
      status
      historyEvents {
        date
        type
        action
        entity

        ... on OrderCheckoutSessionHistoryEvent {
          sessionId
        }

        ... on OrderPaidOnlineByCreditCardHistoryEvent {
          payment {
            id
            amount
            currency {
              symbolNative
            }
          }
        }

        ... on OrderZeroPaidHistoryEvent {
          payment {
            id
            amount
            currency {
              symbolNative
            }
          }
        }

        ... on DepositPaidOnlineByCreditCardHistoryEvent {
          payment {
            id
            amount
            currency {
              symbolNative
            }
          }
        }

        ... on OrderPaidByGiftCardHistoryEvent {
          payment {
            id
            amount
            currency {
              symbolNative
            }
          }
        }
      }
    }
  }
`;

export const useReopenOrder = () => {
  const [mutate, { data, loading, error }] = useMutation<IReopenOrderRes, IReopenOrderVars>(REOPEN_ORDER, {
    update(cache, { data }) {
      if (data?.reopenOrder) {
        cache.modify({
          id: cache.identify(data.reopenOrder as any),
          fields: {
            status() {
              return data?.reopenOrder.status;
            },
            historyEvents() {
              return data?.reopenOrder.historyEvents;
            },
          },
        });
      }
    },
  });

  return { mutate, data, loading, error };
};
