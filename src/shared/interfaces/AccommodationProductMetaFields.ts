import { IVisibilityOption } from './Visibility';
import { ProductType } from '../enums/ProductType';
import { AccommodationSpecificationType } from '../enums';

export interface IAccommodationProductMetaFields {
  specification: {
    options: IAccommodationSpecificationOption[];
  };
  tariff: {
    options: IAccommodationTariffOption[];
  };
  type: ProductType;
  visibility: {
    options: IVisibilityOption[];
  };
}

interface IAccommodationSpecificationOption {
  id: AccommodationSpecificationType;
  label: string;
}

interface IAccommodationTariffOption {
  id: string;
  label: string;
}
