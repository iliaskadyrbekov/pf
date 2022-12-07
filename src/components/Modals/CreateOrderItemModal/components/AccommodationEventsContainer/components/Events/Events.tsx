import React from 'react';
import { useLazyQuery } from '@apollo/client';

import { Event } from '../Event';
import EventsLayout from './EventsLayout';
import { SpinnerIcon } from '@components/Icons';
import { MessageLayout } from '../../../components';

import { IAccommodationProductsRes, IAccommodationProductsVars, ACCOMMODATION_PRODUCTS } from './mutations';

interface IEventsProps {
  activityId: string;
  from: Date;
  to: Date;
}

const Events = ({ to, from, activityId }: IEventsProps) => {
  const [getAccommodationProducts, { data, loading }] = useLazyQuery<
    IAccommodationProductsRes,
    IAccommodationProductsVars
  >(ACCOMMODATION_PRODUCTS, { fetchPolicy: 'network-only' });

  React.useEffect(() => {
    getAccommodationProducts({
      variables: {
        activityId,
        date: {
          from,
          to,
        },
      },
    });
  }, [from, to]);

  const products = data?.accommodationProducts || [];

  if (!loading && !products?.length) {
    return <MessageLayout>No available events</MessageLayout>;
  }

  return (
    <EventsLayout loader={loading && <SpinnerIcon />}>
      {products.map((product) => (
        <Event product={product} to={to} from={from} key={product.id} />
      ))}
    </EventsLayout>
  );
};

export default Events;
