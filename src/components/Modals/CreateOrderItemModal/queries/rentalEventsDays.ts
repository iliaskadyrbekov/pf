import { gql } from '@apollo/client';

import { IRentalProduct } from 'src/shared/interfaces/Product';

export interface IRentalEventsDaysRes {
  rentalProducts: IRentalProduct[];
}

export interface IRentalEventsDaysVars {
  activityId: string;
  from: Date;
  to: Date;
  productsIds?: null | string[];
}

export const RENTAL_EVENTS_DAYS = gql`
  query RentalEventsDays($activityId: ObjectId!, $from: Date, $to: Date, $productsIds: [ObjectId!]) {
    rentalProducts(activityId: $activityId, productsIds: $productsIds) {
      events {
        id
        availableDays(from: $from, to: $to)
      }
    }
  }
`;
