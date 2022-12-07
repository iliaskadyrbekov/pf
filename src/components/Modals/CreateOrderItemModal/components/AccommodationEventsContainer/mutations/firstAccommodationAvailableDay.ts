import { gql } from '@apollo/client';

import { IAccommodationProduct } from 'src/shared/interfaces';

export interface IFirstAccommodationAvailableDayVars {
  activityId: string;
  from: Date;
}

export interface IFirstAccommodationAvailableDayRes {
  accommodationProducts: IAccommodationProduct[];
}

export const FIRST_ACCOMMODATION_AVAILABLE_DAY = gql`
  query FirstAccommodationAvailableDay($activityId: ObjectId!, $from: Date!) {
    accommodationProducts(activityId: $activityId) {
      firstAvailableDay(from: $from)
    }
  }
`;
