import React from 'react';
import moment from 'moment-timezone';
import { CalendarIcon } from '@heroicons/react/solid';

import { getBuyerNameFromCheckoutForm } from 'src/helpers/getBuyerNameFromCheckoutForm';
import { ITicketOrderItem } from 'src/shared/interfaces/OrderItem';
import TicketOrderItemInfoCellLayout from './TicketProductCellLayout';
import { FormLanguageContext } from 'src/context';
import { getIconByType } from 'src/helpers';

interface ITicketProductCellProps {
  orderItem: ITicketOrderItem;
}

const TicketProductCell = ({ orderItem }: ITicketProductCellProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const event = orderItem.event;
  const product = event.product;

  const name = getMultiLanguageValue(product.name);
  const activityName = getMultiLanguageValue(product.activity.name);
  const variationName = getMultiLanguageValue(orderItem.pricing.name);
  const buyerName = getBuyerNameFromCheckoutForm(orderItem.checkoutForm);
  const activityType = product.activity.type;
  const date = orderItem.date;
  const allDay = event.allDay;
  const ActivityTypeIcon = getIconByType(activityType);

  return (
    <TicketOrderItemInfoCellLayout
      name={name}
      variation={variationName}
      buyer={buyerName}
      activityTypeIcon={<ActivityTypeIcon />}
      activity={activityName}
      dateIcon={<CalendarIcon />}
      date={moment(date).format('DD/MM/yyyy')}
      time={allDay ? null : moment(date).format('HH:mm')}
    />
  );
};

export default TicketProductCell;
