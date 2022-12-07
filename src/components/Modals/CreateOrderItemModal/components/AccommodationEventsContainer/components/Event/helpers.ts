import { AccommodationSpecificationType } from 'src/shared/enums';

export const specificationLabelByTypeMap = {
  [AccommodationSpecificationType.PERSONS]: 'Persons',
  [AccommodationSpecificationType.ADULTS]: 'Adults',
  [AccommodationSpecificationType.CHILDREN]: 'Children',
  [AccommodationSpecificationType.BEDS]: 'Beds',
  [AccommodationSpecificationType.BEDROOMS]: 'Bedrooms',
  [AccommodationSpecificationType.BATHS]: 'Baths',
};
