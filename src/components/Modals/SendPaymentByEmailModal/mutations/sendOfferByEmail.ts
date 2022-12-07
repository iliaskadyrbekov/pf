import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { IOrder } from 'src/shared/interfaces/Order';

export interface ISendOfferByEmailRes {
  sendOfferByEmail: IOrder;
}

export interface ISendOfferByEmailVars {
  shopId: string;
  input: {
    orderId: string;
    buyer: { email: string; phone: string; companyName?: string; fullName: string };
    language: { lang: string; country: string };
    successUrl: string;
    cancelUrl: string;
    sendTo: string;
    expiresAt: Date;
    note: string;
    partialPayment?: { firstPaymentAmount: number; endPaymentDate: Date; endPaymentReminderDate: Date };
  };
}

export const SEND_OFFER_BY_EMAIL = gql`
  mutation SendOfferByEmail($shopId: ObjectId!, $input: SendOfferByEmailInput!) {
    sendOfferByEmail(shopId: $shopId, input: $input) {
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

export const useSendOfferByEmail = () => {
  const [mutate, { data, loading, error }] = useMutation<ISendOfferByEmailRes, ISendOfferByEmailVars>(
    SEND_OFFER_BY_EMAIL,
    {
      update(cache, { data }) {
        if (data?.sendOfferByEmail) {
          cache.modify({
            id: cache.identify(data.sendOfferByEmail as any),
            fields: {
              historyEvents() {
                return data?.sendOfferByEmail.historyEvents;
              },
              note() {
                return data?.sendOfferByEmail.note;
              },
              buyer() {
                return data?.sendOfferByEmail.buyer;
              },
              status() {
                return data?.sendOfferByEmail.status;
              },
            },
          });
        }
      },
    },
  );

  return { mutate, data, loading, error };
};
