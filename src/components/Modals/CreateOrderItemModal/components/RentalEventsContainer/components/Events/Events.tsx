import React from 'react';
import moment from 'moment-timezone';
import { useLazyQuery } from '@apollo/client';

import EventsLayout from './EventsLayout';
import { SpinnerIcon } from '@components/Icons';
import { MessageLayout } from '../../../components';
import SimpleEvent from '../Event/components/RentalEventType/SimpleEvent';

import { IRentalProduct } from 'src/shared/interfaces/Product';
import {
  IRentalProductRes,
  IRentalProductVars,
  RENTAL_PRODUCTS,
} from '@components/Modals/CreateOrderItemModal/queries/rentalProduct';

interface IEventsProps {
  date?: Date;
  productId: null | string;
  activityId: string;
}

const Events = ({ date, productId, activityId }: IEventsProps) => {
  const [getRentalProducts, { data, loading }] = useLazyQuery<IRentalProductRes, IRentalProductVars>(RENTAL_PRODUCTS, {
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    getRentalProducts({
      variables: {
        activityId,
        from: moment(date).startOf('day').toDate(),
        to: moment(date).endOf('day').toDate(),
        productsIds: productId ? [productId] : null,
      },
    });
  }, [activityId, date, productId]);

  const rentalProducts =
    data?.rentalProducts
      .filter((product) => product.events.some((event) => event.availableDays.length))
      .reduce<IRentalProduct[]>((acc, product) => {
        const events = product.events.filter((event) => event.availableDays.length);
        if (events.length > 1) {
          return [...acc, ...events.map((event) => ({ ...product, events: [event] }))];
        }
        return [...acc, { ...product, events: events }];
      }, []) || [];

  // const formatRentalProducts = () => {
  //   const simpleProducts = rentalProducts.filter((product) => !product.category);
  //   const productsWithCategory = rentalProducts.filter((product) => product.category);
  //
  //   const categories = Array.from(new Set(productsWithCategory.map((product) => product.category?.id)));
  //   const groupProducts = categories.reduce<IRentalProductField[][]>((acc, id) => {
  //     const groupProductsItem = productsWithCategory.filter((product) => product.category?.id === id);
  //     return [...acc, groupProductsItem];
  //   }, []);
  //
  //   return [...simpleProducts, ...groupProducts];
  // };

  const renderEventByType = (product: IRentalProduct) => {
    // if (Array.isArray(product)) {
    // return <GroupEvent products={product as IRentalProductField[]} key={product[0].id} />;
    //   return null;
    // } else {
    return (
      <SimpleEvent
        product={product as IRentalProduct}
        initialVariationId={product.pricing[0].id}
        from={moment(date).startOf('day').subtract(1, 'second').toDate()}
        to={moment(date).endOf('day').toDate()}
        key={product.id}
      />
    );
    // }
  };

  if (!loading && (!rentalProducts?.length || !date)) {
    return <MessageLayout>No available events</MessageLayout>;
  }

  return (
    <EventsLayout loader={loading && <SpinnerIcon />}>
      {rentalProducts.map((product) => renderEventByType(product))}
    </EventsLayout>
  );
};

export default Events;
