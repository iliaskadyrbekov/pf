import { gql } from '@apollo/client';

export const EVENT_FIELDS = gql`
  fragment EventFields on Event {
    event {
      ... on OneTimeEvent {
        allDay
        id
        type
        quantity
        availability
        maxPurchase
        minPurchase
        maxPurchaseTime {
          value
          type
        }
        minPurchaseTime {
          value
          type
        }
        startDate
        endDate
        connectedResources {
          order
          resource {
            id
            name {
              lang
              value
              country
            }
            availability
          }
        }
      }
      ... on RecurringEvent {
        allDay
        quantity
        availability
        id
        allDay
        freq
        interval
        byweekday
        tzid
        dtstart
        until
        exdate
        type
        maxPurchase
        minPurchase
        maxPurchaseTime {
          value
          type
        }
        minPurchaseTime {
          value
          type
        }
        connectedResources {
          order
          resource {
            id
            name {
              lang
              value
              country
            }
            availability
          }
        }
      }
    }
    product {
      type
      name {
        lang
        value
        country
      }
      ... on TicketProduct {
        duration {
          type
          value
        }
      }
    }
  }
`;
