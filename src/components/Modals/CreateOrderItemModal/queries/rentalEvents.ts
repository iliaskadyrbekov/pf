import { gql } from '@apollo/client';
import { TRentalEvent } from 'src/shared/interfaces/RentalEvent';

export interface IRentalEventsRes {
  rentalEvents: TRentalEvent[];
}

export interface IRentalEventsVars {
  productId: string[];
  from: Date;
  to: Date;
  variationId: string;
}

export const RENTAL_EVENTS = gql`
  query RentalEvents($productId: [ObjectId!]!, $from: Date, $to: Date, $variationId: ObjectId!) {
    rentalEvents(productId: $productId) {
      availableDates(from: $from, to: $to, variationId: $variationId) {
        availablePlaces
        date
        isMaxPurchaseTimeValid
        isMinPurchaseTimeValid
        isAvailableByTime
      }
      availableDays(from: $from, to: $to)

      id
      type
      quantity
      minPurchaseTime {
        type
        value
      }
      maxPurchaseTime {
        type
        value
      }

      ... on RentalOneTimeEvent {
        startDate
        endDate
      }

      ... on RentalRecurringEvent {
        freq
        interval
        byweekday
        dtstart
        until
        exdate
      }
    }
  }
`;
