import { gql } from '@apollo/client';

import { IRentalProduct } from 'src/shared/interfaces/Product';

export interface IFirstRentalAvailableDatesRes {
  rentalProducts: IRentalProduct[];
}

export interface IFirstRentalAvailableDatesVars {
  activityId: string;
  productsIds: string[] | null;
  from: Date;
}

export const FIRST_RENTAL_AVAILABLE_DATES = gql`
  query FirstRentalAvailableDates($activityId: ObjectId!, $productsIds: [ObjectId!], $from: Date!) {
    rentalProducts(activityId: $activityId, productsIds: $productsIds) {
      firstAvailableDate(from: $from)
    }
  }
`;
