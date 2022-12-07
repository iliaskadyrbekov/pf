import { gql, useQuery } from '@apollo/client';
import { TRentalEvent } from 'src/shared/interfaces/RentalEvent';

export interface IRentalEventsVars {
  productId: string;
}

export interface IRentalEventsRes {
  rentalEvents: TRentalEvent[];
}

export const RENTAL_EVENTS = gql`
  query RentalEvents($productId: [ObjectId!]!) {
    rentalEvents(productId: $productId) {
      id
      type
      quantity
      startTime
      endTime
      minPurchaseTime {
        value
        type
      }
      maxPurchaseTime {
        value
        type
      }

      ... on RentalOneTimeEvent {
        startDate
        endDate
      }

      ... on RentalRecurringEvent {
        freq
        interval
        tzid
        byweekday
        dtstart
        until
        exdate
      }
    }
  }
`;

export const useRentalEventsQuery = (vars: IRentalEventsVars) => {
  return useQuery<IRentalEventsRes, IRentalEventsVars>(RENTAL_EVENTS, {
    variables: vars,
  });
};
