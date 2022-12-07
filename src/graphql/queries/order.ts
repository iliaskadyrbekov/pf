import { gql, useQuery } from '@apollo/client';

import { IOrder } from 'src/shared/interfaces/Order';

export type IOrderRes = {
  order: IOrder;
};

export interface IOrderVars {
  id: string;
}

export const ORDER = gql`
  query Order($id: ObjectId!) {
    order(id: $id) {
      offer {
        expiresAt
        partialPayment {
          firstPaymentAmount
          endPaymentDate
          endPaymentReminderDate
        }
      }
      createdFrom
      note
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
      id
      shortId
      buyer {
        fullName
        phone
        email
        companyName
        address
      }
      paymentStatus
      payment {
        id
        amount
        created
        currency {
          symbolNative
        }
        ... on StripePayment {
          paymentMethod {
            type
          }
        }
      }
      status
      orderItems {
        orderItem {
          ... on TicketOrderItem {
            event {
              allDay
              id
              product {
                VAT {
                  value
                }
                type
                name {
                  lang
                  value
                  country
                }
                activity {
                  name {
                    lang
                    value
                    country
                  }
                  type
                }
              }
            }
            id
            type
            date
            status
            VAT
            paymentStatus
            purchased
            isRegistered
            discount {
              value
              type
            }
            pricing {
              name {
                value
                lang
                country
              }
              price
            }
            assignee {
              fullName
              phone
              email
            }
            checkoutForm {
              type
              name {
                lang
                value
                country
              }
              ... on OrderItemCheckoutCommonField {
                value
              }
              ... on OrderItemCheckoutCalendarField {
                dateValue: value
              }
            }
          }
          ... on GiftCardOrderItem {
            id
            type
            status
            VAT
            paymentStatus
            purchased
            discount {
              value
              type
            }
            pricing {
              name {
                value
                lang
                country
              }
              price
            }
            assignee {
              fullName
              phone
              email
            }
            checkoutForm {
              type
              name {
                lang
                value
                country
              }
              ... on OrderItemCheckoutCommonField {
                value
              }
              ... on OrderItemCheckoutCalendarField {
                dateValue: value
              }
            }
            product {
              id
              VAT {
                value
              }
              activity {
                type
                name {
                  lang
                  value
                  country
                }
              }
              name {
                lang
                value
                country
              }
            }
          }
          ... on RentalOrderItem {
            VAT
            id
            type
            date
            status
            paymentStatus
            purchased
            discount {
              value
              type
            }
            pricing {
              id
              name {
                value
                lang
                country
              }
              price
            }
            assignee {
              fullName
              phone
              email
            }
            checkoutForm {
              type
              name {
                lang
                value
                country
              }
              ... on OrderItemCheckoutCommonField {
                value
              }
              ... on OrderItemCheckoutCalendarField {
                dateValue: value
              }
            }
            event {
              id

              product {
                name {
                  lang
                  value
                  country
                }
                VAT {
                  value
                }

                activity {
                  id
                  type
                  name {
                    lang
                    value
                    country
                  }
                }
              }
            }
          }
          ... on AccommodationOrderItem {
            VAT
            id
            type
            date
            dateEnd
            status
            paymentStatus
            purchased
            discount {
              value
              type
            }
            pricing {
              name {
                value
                lang
                country
              }
              price
            }
            assignee {
              fullName
              phone
              email
            }
            checkoutForm {
              type
              name {
                lang
                value
                country
              }
              ... on OrderItemCheckoutCommonField {
                value
              }
              ... on OrderItemCheckoutCalendarField {
                dateValue: value
              }
            }
            product {
              id
              VAT {
                value
              }
              activity {
                type
                name {
                  lang
                  value
                  country
                }
              }
              name {
                lang
                value
                country
              }
            }
          }
        }
      }
    }
  }
`;

export const useOrderQuery = (vars: IOrderVars) => {
  return useQuery<IOrderRes, IOrderVars>(ORDER, { variables: vars });
};
