import { gql } from '@apollo/client';

import { IAccommodationProduct } from 'src/shared/interfaces';
import { AccommodationSpecificationType } from 'src/shared/enums';

export interface IAccommodationProductsRes {
  accommodationProducts: IAccommodationProduct[];
}

export interface IAccommodationProductsVars {
  activityId: string;
  date: {
    from: Date;
    to: Date;
  };
}

export interface IAccommodationProductsSpecificationArg {
  amount: number;
  type: AccommodationSpecificationType;
}

export const ACCOMMODATION_PRODUCTS = gql`
  query AccommodationProducts($activityId: ObjectId!, $date: DateRangeInput) {
    accommodationProducts(activityId: $activityId, date: $date) {
      id
      type
      name {
        lang
        value
        country
      }
      accommodationMedia: media {
        isMain
        key
        order
      }
      accommodationPricing: pricing {
        price
        comparedWithPrice
        tariff
      }
      specifications {
        type
        order
        amount
      }
      availablePlaces
    }
  }
`;
