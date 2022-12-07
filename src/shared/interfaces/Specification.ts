import { AccommodationSpecificationType } from '../enums';

export interface IAccommodationSpecification {
  amount: number;
  order: number;
  type: AccommodationSpecificationType;
}

export interface IAccommodationActivitySpecification {
  order: number;
  type: AccommodationSpecificationType;
}
