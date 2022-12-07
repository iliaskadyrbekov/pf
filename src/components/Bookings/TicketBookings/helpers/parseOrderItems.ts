import React from 'react';

import { isDefined } from '@utils/isDefined';
import { FormLanguageContext } from 'src/context';
import { ITicketOrderItem } from 'src/shared/interfaces';
import { GeneralPaymentStatus, getGeneralPaymentStatus } from '@components/Bookings/helpers/getGeneralPaymentStatus';
import { eventColorByGeneralPaymentStatus } from '@components/Bookings/helpers/eventColorByGeneralPaymentStatus';

type TResourcesResult = {
  id: string;
  title: string;
  children: Record<string, { id: string; title: string }>;
};

type TEventsResult = {
  start: Date;
  end: Date;
  paymentStatus: GeneralPaymentStatus;
  resourceIds: string[];
  quantity: number | string;
  booked: number;
  id: string;
};

type TReduceResult = {
  resources: Record<string, TResourcesResult>;
  events: Record<string, TEventsResult>;
};

export const parseOrderItems = (orderItems?: ITicketOrderItem[]) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  if (!orderItems) {
    return {
      resources: [],
      events: [],
    };
  }

  const { resources, events } = orderItems.reduce<TReduceResult>(
    (acc, orderItem) => {
      const activityId = orderItem.event.product.activity.id;
      const activityName = getMultiLanguageValue(orderItem.event.product.activity.name);

      const productId = orderItem.event.product.id;
      const productName = getMultiLanguageValue(orderItem.event.product.name);

      const orderPaymentStatus = orderItem.order.paymentStatus;
      const eventId = orderItem.event.id;
      const eventAvailability = orderItem.event.availability;
      const eventStart = orderItem.date;
      const eventEnd = orderItem.dateEnd;
      const eventKey = `${eventId}:${eventStart}-${eventEnd}`;

      return {
        ...acc,
        events: {
          ...acc.events,
          [eventKey]: {
            ...(acc.events[eventKey]
              ? {
                  ...acc.events[eventKey],
                  booked: (acc.events[eventKey].booked += 1),
                  paymentStatus: getGeneralPaymentStatus(orderPaymentStatus, acc.events[eventKey].paymentStatus),
                }
              : {
                  id: eventId,
                  start: eventStart,
                  end: eventEnd,
                  resourceIds: [productId],
                  quantity: isDefined(eventAvailability) ? eventAvailability : 'Unlimited',
                  paymentStatus: getGeneralPaymentStatus(orderPaymentStatus),
                  booked: 1,
                }),
          },
        },
        resources: {
          ...acc.resources,
          [activityId]: {
            ...(acc.resources[activityId] ?? { title: activityName, id: activityId }),
            children: {
              ...(acc.resources[activityId]?.children ?? {}),
              [productId]: {
                ...(acc.resources[activityId]?.children?.[productId] ?? { title: productName, id: productId }),
              },
            },
          },
        },
      };
    },
    { resources: {}, events: {} },
  );

  return {
    resources: Object.values(resources).map((resource) => ({
      ...resource,
      children: resource.children ? Object.values(resource.children) : [],
    })),
    events: Object.values(events).map((event) => ({
      id: event.id,
      color: eventColorByGeneralPaymentStatus(event.paymentStatus),
      resourceIds: event.resourceIds,
      title: `${event.booked}/${event.quantity}`,
      start: event.start,
      end: event.end,
    })),
  };
};
