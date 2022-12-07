import { DiscountType } from 'src/shared/enums/DiscountType';

export const getDiscountSign = (discountType: DiscountType) => {
  switch (discountType) {
    case DiscountType.AMOUNT:
      return '=';
    case DiscountType.PERCENTAGE:
      return '%';
  }
};
