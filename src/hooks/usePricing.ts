import React from 'react';

import { isDefined } from '@utils/isDefined';
import { ShopContext } from 'src/context/ShopContext';

function usePricing() {
  const { shop } = React.useContext(ShopContext);

  const getPrice = (price?: number) =>
    isDefined(price) ? `${shop?.currency.symbolNative} ${price} ${shop?.currency.id}` : undefined;

  return { getPrice };
}

export default usePricing;
