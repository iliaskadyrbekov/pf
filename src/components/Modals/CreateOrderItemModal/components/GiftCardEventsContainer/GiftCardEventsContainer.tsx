import React from 'react';

import { SpinnerIcon } from '@components/Icons';
import { Product, ProductsLayout } from './components';
import GiftCardEventsContainerLayout from './GiftCardEventsContainerLayout';

import { useGiftCardProductsQuery } from 'src/graphql/queries/gftCardProducts';

interface IGiftCardEventsContainerProps {
  activityId: string;
}

const GiftCardEventsContainer = ({ activityId }: IGiftCardEventsContainerProps) => {
  const { data, loading } = useGiftCardProductsQuery({ activityId });

  return (
    <GiftCardEventsContainerLayout
      products={
        <ProductsLayout
          loader={loading && <SpinnerIcon />}
          products={data?.giftCardProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        />
      }
    />
  );
};

export default GiftCardEventsContainer;
