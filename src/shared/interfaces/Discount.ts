import { DiscountType } from '../enums/DiscountType';

export interface IDiscount {
  type: DiscountType;
  value: number;
}
