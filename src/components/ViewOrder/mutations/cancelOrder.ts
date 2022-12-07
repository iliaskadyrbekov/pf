import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { EOrderStatus } from 'src/shared/enums/OrderStatus';
import { TOrderHistoryEvent } from 'src/shared/interfaces/HistoryEvent';

export interface ICancelOrderRes {
  cancelOrder: {
    id: string;
    status: EOrderStatus;
    historyEvents: TOrderHistoryEvent[];
  };
}

export interface ICancelOrderVars {
  shopId?: string;
  input: { id: string; reason?: string };
}

export const CANCEL_ORDER = gql`
  mutation CancelOrder($input: CancelOrderInput!, $shopId: ObjectId!) {
    cancelOrder(input: $input, shopId: $shopId) {
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

export const useCancelOrder = () => {
  const [mutate, { data, loading, error }] = useMutation<ICancelOrderRes, ICancelOrderVars>(CANCEL_ORDER, {
    update(cache, { data }) {
      if (data?.cancelOrder) {
        cache.modify({
          id: cache.identify(data.cancelOrder as any),
          fields: {
            status() {
              return data?.cancelOrder.status;
            },
            historyEvents() {
              return data?.cancelOrder.historyEvents;
            },
          },
        });
      }
    },
  });

  return { mutate, data, loading, error };
};
