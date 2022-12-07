import { gql } from '@apollo/client';

import { IAccommodationProduct } from 'src/shared/interfaces';

export interface IAccommodationAvailableDaysRes {
  accommodationProducts: IAccommodationProduct[];
}

export interface IAccommodationAvailableDaysVars {
  activityId: string;
  from: Date;
  to: Date;
}

export const ACCOMMODATION_AVAILABLE_DAYS = gql`
  query accommodationAvailableDays($activityId: ObjectId!, $from: Date!, $to: Date!) {
    accommodationProducts(activityId: $activityId) {
      availableDays(from: $from, to: $to)
    }
  }
`;
