import React from 'react';
import moment from 'moment-timezone';
import { CalendarIcon } from '@heroicons/react/solid';

import { getBuyerNameFromCheckoutForm } from 'src/helpers/getBuyerNameFromCheckoutForm';
import { IRentalOrderItem } from 'src/shared/interfaces/OrderItem';
import RentalOrderItemInfoCellLayout from './RentalProductCellLayout';
import { getIconByType } from 'src/helpers';
import { FormLanguageContext } from 'src/context';

interface IRentalProductCellProps {
  orderItem: IRentalOrderItem;
}

const RentalProductCell = ({ orderItem }: IRentalProductCellProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const {
    event: { product },
  } = orderItem;

  const name = getMultiLanguageValue(product.name);
  const activityName = getMultiLanguageValue(product.activity.name);
  const variationName = getMultiLanguageValue(orderItem.pricing.name);
  const buyerName = getBuyerNameFromCheckoutForm(orderItem.checkoutForm);
  const activityType = product.activity.type;
  const date = orderItem.date;

  const ActivityTypeIcon = getIconByType(activityType);

  return (
    <RentalOrderItemInfoCellLayout
      name={name}
      variation={variationName}
      buyer={buyerName}
      activityTypeIcon={<ActivityTypeIcon />}
      activity={activityName}
      dateIcon={<CalendarIcon />}
      date={moment(date).format('DD/MM/yyyy')}
      time={moment(date).format('HH:mm')}
    />
  );
};

export default RentalProductCell;
