import { TProductWithEventsField } from 'src/shared/interfaces/Product';

export const getInitialDate = (products: TProductWithEventsField[]) => {
  const filteredProducts = products.filter((product) => product.firstAvailableDate);

  if (!filteredProducts.length) {
    return new Date();
  }

  const sortedFirstAvailableDates = filteredProducts.map((product) => product.firstAvailableDate).sort();

  return sortedFirstAvailableDates[0];
};
