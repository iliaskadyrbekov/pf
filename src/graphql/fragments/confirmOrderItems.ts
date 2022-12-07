import { gql } from '@apollo/client';

export const CONFIRM_ORDER_ITEMS_FIELDS = gql`
  fragment ConfirmOrderItemsFields on OrderItem {
    orderItem {
      ... on TicketOrderItem {
        id
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
        __typename
      }
      ... on GiftCardOrderItem {
        id
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
        __typename
      }
      ... on RentalOrderItem {
        id
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
        __typename
      }
      ... on AccommodationOrderItem {
        id
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
        __typename
      }
    }
  }
`;
