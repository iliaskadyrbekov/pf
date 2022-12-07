import { gql } from '@apollo/client';
import { IRentalProduct } from 'src/shared/interfaces/Product';

export interface IRentalProductVars {
  activityId: string;
  from: Date;
  to: Date;
  productsIds: string[] | null;
}

export interface IRentalProductRes {
  rentalProducts: IRentalProduct[];
}

export const RENTAL_PRODUCTS = gql`
  query RentalProducts($activityId: ObjectId!, $from: Date, $to: Date, $productsIds: [ObjectId!]) {
    rentalProducts(activityId: $activityId, productsIds: $productsIds) {
      id
      type
      name {
        lang
        value
        country
      }
      media
      pricing {
        id
        price
        comparedWithPrice
        maxPurchase
        minPurchase
        name {
          lang
          value
          country
        }
        duration {
          type
          value
        }
        order
      }
      events {
        availableDays(from: $from, to: $to)
        allAvailableDates(from: $from, to: $to) {
          availablePlaces
          date
          isAvailableByTime
          isMaxPurchaseTimeValid
          isMinPurchaseTimeValid
          variationId
        }

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
      }
    }
  }
`;
