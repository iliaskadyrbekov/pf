import { DiscountType } from 'src/shared/enums/DiscountType';
import { IDiscount } from 'src/shared/interfaces/Discount';

const getAmountDiscount = (price: number, discount: number) => price - discount;

const getPercentageDiscount = (price: number, discount: number, discountInPercentage: boolean) =>
  price - price * (discountInPercentage ? discount / 100 : discount);

export const getDiscountPrice = (price: number, discount?: IDiscount, discountInPercentage = true) => {
  if (!discount) {
    return price;
  }

  switch (discount.type) {
    case DiscountType.AMOUNT:
      return getAmountDiscount(price, discount.value);
    case DiscountType.PERCENTAGE:
      return getPercentageDiscount(price, discount.value, discountInPercentage);
  }
};
