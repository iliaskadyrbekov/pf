import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { TAccommodationEvent } from 'src/shared/interfaces/AccommodationEvent';

export interface IAccommodationEventsVars {
  productId: string;
}

export interface IAccommodationEventsRes {
  accommodationEvents: TAccommodationEvent[];
}

export const ACCOMMODATION_EVENTS = gql`
  query AccommodationEvents($productId: ObjectId!) {
    accommodationEvents(productId: $productId) {
      id
      type
      quantity
      maxPurchase
      minPurchase
      availability
      maxPurchaseTime {
        type
        value
      }
      minPurchaseTime {
        type
        value
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
          group {
            name
          }
        }
      }
      ... on AccommodationOneTimeEvent {
        startDate
      }
      ... on AccommodationRecurringEvent {
        byweekday
        dtstart
        exdate
        freq
        interval
        until
      }
    }
  }
`;

export const useAccommodationEventsQuery = (vars: IAccommodationEventsVars) => {
  return useQuery<IAccommodationEventsRes, IAccommodationEventsVars>(ACCOMMODATION_EVENTS, {
    variables: vars,
  });
};
