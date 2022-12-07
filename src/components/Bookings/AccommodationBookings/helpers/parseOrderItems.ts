import { BOOKINGS_EVENT_COLORS } from '@components/Bookings/helpers/bookingEventColors';
import { uniqueBy } from '@utils/unique-by';
import React from 'react';

import { FormLanguageContext } from 'src/context';
import { EPaymentStatus } from 'src/shared/enums';
import { IAccommodationOrderItem, IAreaResource, MultiLanguageField } from 'src/shared/interfaces';

type TResourcesResult = {
  id: string;
  title: string;
  children?: { id: string; title: string }[];
};

type TEventsResult = {
  start: Date;
  end: Date;
  resourceIds: string[];
  title: string;
  id: string;
  constraint: {
    resourceIds: string[];
  };
  color?: string;
  resourceEditable?: boolean;
  extendedProps: Record<string, unknown>;
};

type TReduceResult = {
  resources: Record<string, TResourcesResult>;
  events: TEventsResult[];
};

const prepareAreaResources = (
  areaResources: IAreaResource[],
  getMultiLanguageValue: (val: MultiLanguageField[]) => string,
) =>
  areaResources.reduce<Record<string, TResourcesResult>>(
    (acc, cur) =>
      cur.group
        ? {
            ...acc,
            [cur.group.id]: {
              ...(acc[cur.group.id] ?? { title: cur.group.name, id: cur.group.id }),
              children: [
                ...(acc[cur.group.id]?.children ?? []),
                { title: getMultiLanguageValue(cur.name), id: cur.id },
              ],
            },
          }
        : {
            ...acc,
            [cur.id]: {
              ...(acc[cur.id] ?? { title: getMultiLanguageValue(cur.name), id: cur.id }),
            },
          },
    {},
  );

const eventColorByPaymentStatus = (paymentStatus: EPaymentStatus) => {
  switch (paymentStatus) {
    case EPaymentStatus.PAID:
    case EPaymentStatus.FREE:
      return BOOKINGS_EVENT_COLORS.green;
    case EPaymentStatus.PARTLY_PAID:
      return BOOKINGS_EVENT_COLORS.yellow;
    default:
      return BOOKINGS_EVENT_COLORS.red;
  }
};

export const parseOrderItems = (orderItems?: IAccommodationOrderItem[], areaResources?: IAreaResource[]) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  if (!orderItems?.length || !areaResources) {
    return {
      resources: [],
      events: [],
    };
  }

  const initialResources = prepareAreaResources(areaResources, getMultiLanguageValue);
  const allAreaResourcesIds = areaResources.map(({ id }) => id);

  const { resources, events } = orderItems.reduce<TReduceResult>(
    (acc, orderItem) => {
      const productName = getMultiLanguageValue(orderItem.product.name);

      const orderItemBuyerName = orderItem.order.buyer?.fullName;
      const orderItemId = orderItem.id;

      const eventStart = orderItem.date;
      const eventEnd = orderItem.dateEnd;
      const eventTitle = orderItemBuyerName ?? '';
      const eventColor = eventColorByPaymentStatus(orderItem.order.paymentStatus);

      if (!orderItem.resource) {
        return {
          ...acc,
          events: [
            ...acc.events,
            {
              id: orderItemId,
              start: eventStart,
              end: eventEnd,
              color: eventColor,
              resourceIds: ['unassigned'],
              title: eventTitle,
              constraint: {
                resourceIds: [],
              },
              resourceEditable: false,
              extendedProps: {
                productName,
                constraint: {
                  resourceIds: [],
                },
              },
            },
          ],
          resources: {
            ...acc.resources,
            unassigned: acc.resources['unassigned'] ?? { id: 'unassigned', title: 'Unassigned' },
          },
        };
      }

      const orderItemResourceId = orderItem.resource.id;
      const orderItemEventsConnectedResources = orderItem.events.map((event) =>
        event.connectedResources ? event.connectedResources.map(({ resource }) => resource.id) : [],
      );
      const orderItemsAllConnectedResources = uniqueBy(
        orderItem.events.flatMap((event) =>
          event.connectedResources ? event.connectedResources.map(({ resource }) => resource.id) : [],
        ),
        (item) => item,
      );
      const availableResources = orderItemEventsConnectedResources.reduce<string[]>(
        (acc, cur) => acc.filter((resId) => cur.some((id) => id === resId)),
        orderItemsAllConnectedResources,
      );
      const constraintResources = allAreaResourcesIds.filter((id) => availableResources.includes(id));

      const events = [
        ...acc.events,
        {
          id: orderItemId,
          start: eventStart,
          end: eventEnd,
          color: eventColor,
          resourceIds: [orderItemResourceId],
          title: eventTitle,
          resourceEditable: !!constraintResources,
          constraint: {
            resourceIds: constraintResources,
          },
          extendedProps: {
            productName,
            constraint: {
              resourceIds: constraintResources,
            },
          },
        },
      ];

      return {
        ...acc,
        events,
      };
    },
    { resources: initialResources, events: [] },
  );

  return {
    resources: Object.values(resources),
    events,
  };
};
