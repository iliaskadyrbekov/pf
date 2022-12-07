import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { IOrderItem } from 'src/shared/interfaces/OrderItem';

export interface ICheckoutOrderItemsRes {
  checkoutOrderItems: IOrderItem[];
}

export interface ICheckoutOrderItemsVars {
  orderId: string;
}

export const CHECKOUT_ORDER_ITEMS = gql`
  query CheckoutOrderItems($orderId: ObjectId!) {
    checkoutOrderItems(orderId: $orderId) {
      event {
        event {
          ... on OneTimeEvent {
            id
          }
          ... on RecurringEvent {
            id
          }
        }
        product {
          id
          name {
            lang
            country
            value
          }

          ... on TicketProduct {
            checkoutForm {
              ... on CheckoutField {
                id
                type
                name {
                  lang
                  country
                  value
                }
                isRequired
                order
              }
              ... on CheckoutTermsCheckboxField {
                id
                type
                name {
                  lang
                  country
                  value
                }
                isRequired
                order
                url {
                  lang
                  country
                  value
                }
              }
              ... on CheckoutExtraInfoField {
                id
                type
                name {
                  lang
                  country
                  value
                }
                isRequired
                order
                text {
                  lang
                  country
                  value
                }
              }
              ... on CheckoutOptionsField {
                id
                type
                name {
                  lang
                  country
                  value
                }
                isRequired
                order
                options {
                  lang
                  country
                  value
                }
              }
            }
          }
        }
      }
      orderItem {
        ... on TicketOrderItem {
          id
          type
          pricing {
            name {
              lang
              country
              value
            }
          }
        }
        ... on GiftCardOrderItem {
          id
          type
          pricing {
            name {
              lang
              country
              value
            }
          }
        }
        ... on RentalOrderItem {
          id
          type
          pricing {
            name {
              lang
              country
              value
            }
          }
          event {
            id
            product {
              id
              type
              name {
                lang
                country
                value
              }
              checkoutForm {
                ... on CheckoutField {
                  id
                  type
                  name {
                    lang
                    country
                    value
                  }
                  isRequired
                  order
                }
                ... on CheckoutTermsCheckboxField {
                  id
                  type
                  name {
                    lang
                    country
                    value
                  }
                  isRequired
                  order
                  url {
                    lang
                    country
                    value
                  }
                }
                ... on CheckoutExtraInfoField {
                  id
                  type
                  name {
                    lang
                    country
                    value
                  }
                  isRequired
                  order
                  text {
                    lang
                    country
                    value
                  }
                }
                ... on CheckoutOptionsField {
                  id
                  type
                  name {
                    lang
                    country
                    value
                  }
                  isRequired
                  order
                  options {
                    lang
                    country
                    value
                  }
                }
              }
            }
          }
        }
        ... on AccommodationOrderItem {
          id
          type
          pricing {
            name {
              lang
              value
              country
            }
          }
          product {
            name {
              lang
              value
              country
            }
            accommodationPricing: pricing {
              tariff
            }
            checkoutForm {
              ... on CheckoutField {
                id
                type
                name {
                  lang
                  value
                  country
                }
                isRequired
                order
              }
              ... on CheckoutTermsCheckboxField {
                id
                type
                name {
                  lang
                  value
                  country
                }
                isRequired
                order
                url {
                  lang
                  value
                  country
                }
              }
              ... on CheckoutExtraInfoField {
                id
                type
                name {
                  lang
                  value
                  country
                }
                isRequired
                order
                text {
                  lang
                  value
                  country
                }
              }
              ... on CheckoutOptionsField {
                id
                type
                name {
                  lang
                  value
                  country
                }
                isRequired
                order
                options {
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
  }
`;

export const useCheckoutOrderItemsQuery = (vars: ICheckoutOrderItemsVars) => {
  return useQuery<ICheckoutOrderItemsRes, ICheckoutOrderItemsVars>(CHECKOUT_ORDER_ITEMS, {
    variables: vars,
    fetchPolicy: 'network-only',
  });
};
