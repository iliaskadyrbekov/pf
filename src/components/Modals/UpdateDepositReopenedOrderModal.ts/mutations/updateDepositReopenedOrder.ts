import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { IOrder } from 'src/shared/interfaces/Order';

export interface IUpdateDepositReopenedOrderRes {
  updateDepositReopenedOrder: IOrder;
}

export interface IUpdateDepositReopenedOrderVars {
  shopId: string;
  input: {
    orderId: string;
    buyer: { email: string; phone: string; companyName?: string; fullName: string };
    language: { lang: string; country: string };
    successUrl: string;
    cancelUrl: string;
    sendTo: string;
    note: string;
    partialPayment: { endPaymentDate: Date; endPaymentReminderDate: Date };
  };
}

export const UPDATE_DEPOSIT_REOPENED_ORDER = gql`
  mutation UpdateDepositReopenedOrder($shopId: ObjectId!, $input: UpdateDepositReopenedOrderInput!) {
    updateDepositReopenedOrder(shopId: $shopId, input: $input) {
      id
      status
      note
      buyer {
        fullName
        email
        phone
        companyName
      }
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

export const useUpdateDepositReopenedOrder = () => {
  const [mutate, { data, loading, error }] = useMutation<
    IUpdateDepositReopenedOrderRes,
    IUpdateDepositReopenedOrderVars
  >(UPDATE_DEPOSIT_REOPENED_ORDER, {
    update(cache, { data }) {
      if (data?.updateDepositReopenedOrder) {
        cache.modify({
          id: cache.identify(data.updateDepositReopenedOrder as any),
          fields: {
            historyEvents() {
              return data?.updateDepositReopenedOrder.historyEvents;
            },
            note() {
              return data?.updateDepositReopenedOrder.note;
            },
            buyer() {
              return data?.updateDepositReopenedOrder.buyer;
            },
            status() {
              return data?.updateDepositReopenedOrder.status;
            },
          },
        });
      }
    },
  });

  return { mutate, data, loading, error };
};
