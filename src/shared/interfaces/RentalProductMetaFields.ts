import { IVisibilityOption } from './Visibility';

import { ProductType } from '../enums/ProductType';

export interface IRentalProductMetaFields {
  type: ProductType.RENTAL;
  visibility: {
    options: IVisibilityOption[];
  };
}
