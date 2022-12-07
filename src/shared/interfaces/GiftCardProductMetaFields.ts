import { IVisibilityOption } from './Visibility';

import { ProductType } from '../enums/ProductType';

export interface IGiftCardProductMetaFields {
  type: ProductType.GIFT_CARD;
  visibility: {
    options: IVisibilityOption[];
  };
}
