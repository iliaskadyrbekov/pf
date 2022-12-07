import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { EOrderStatus } from 'src/shared/enums/OrderStatus';
import { TOrderHistoryEvent } from 'src/shared/interfaces/HistoryEvent';

export interface IReopenDepositPaidOrderRes {
  reopenDepositPaidOrder: {
    id: string;
    status: EOrderStatus;
    historyEvents: TOrderHistoryEvent[];
  };
}

export interface IReopenDepositPaidOrderVars {
  shopId?: string;
  input: { id: string };
}

export const REOPEN_DEPOSIT_PAID_ORDER = gql`
  mutation ReopenDepositPaidOrder($input: ReopenOrderInput!, $shopId: ObjectId!) {
    reopenDepositPaidOrder(input: $input, shopId: $shopId) {
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

export const useReopenDepositPaidOrder = () => {
  const [mutate, { data, loading, error }] = useMutation<IReopenDepositPaidOrderRes, IReopenDepositPaidOrderVars>(
    REOPEN_DEPOSIT_PAID_ORDER,
    {
      update(cache, { data }) {
        if (data?.reopenDepositPaidOrder) {
          cache.modify({
            id: cache.identify(data.reopenDepositPaidOrder as any),
            fields: {
              status() {
                return data?.reopenDepositPaidOrder.status;
              },
              historyEvents() {
                return data?.reopenDepositPaidOrder.historyEvents;
              },
            },
          });
        }
      },
    },
  );

  return { mutate, data, loading, error };
};
