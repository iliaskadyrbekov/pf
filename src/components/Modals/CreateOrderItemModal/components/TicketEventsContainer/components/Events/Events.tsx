import React from 'react';
import moment from 'moment-timezone';
import { useLazyQuery } from '@apollo/client';

import { Event } from '../Event';
import EventsLayout from './EventsLayout';
import { SpinnerIcon } from '@components/Icons';
import { MessageLayout } from '../../../components';

import {
  ITicketProductsRes,
  ITicketProductsVars,
  TICKET_PRODUCTS,
} from '@components/Modals/CreateOrderItemModal/queries/ticketProducts';

interface IEventsProps {
  date?: Date;
  productId: null | string;
  activityId: string;
}

const Events = ({ date, productId, activityId }: IEventsProps) => {
  const [getProducts, { data, loading }] = useLazyQuery<ITicketProductsRes, ITicketProductsVars>(TICKET_PRODUCTS, {
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    getProducts({
      variables: {
        activityId,
        from: moment(date).startOf('day').toDate(),
        to: moment(date).endOf('day').toDate(),
        productsIds: productId ? [productId] : null,
      },
    });
  }, [activityId, date, productId]);

  const products =
    data?.ticketProducts.filter((product) => product.events.some((event) => event.availableDates?.length)) || [];

  if (!loading && (!products?.length || !date)) {
    return <MessageLayout>No available events</MessageLayout>;
  }

  return (
    <EventsLayout loader={loading && <SpinnerIcon />}>
      {products.map((product) => (
        <Event key={product.id} product={product} />
      ))}
    </EventsLayout>
  );
};

export default Events;
