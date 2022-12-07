import React from 'react';
import moment from 'moment-timezone';
import { CalendarIcon } from '@heroicons/react/solid';

import { getBuyerNameFromCheckoutForm } from 'src/helpers/getBuyerNameFromCheckoutForm';
import { IAccommodationOrderItem } from 'src/shared/interfaces/OrderItem';
import AccommodationOrderItemInfoCellLayout from './AccommodationProductCellLayout';
import { FormLanguageContext } from 'src/context';
import { getIconByType } from 'src/helpers';

interface IAccommodationProductCellProps {
  orderItem: IAccommodationOrderItem;
}

const AccommodationProductCell = ({ orderItem }: IAccommodationProductCellProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const product = orderItem.product;

  const name = getMultiLanguageValue(product.name);
  const activityName = getMultiLanguageValue(product.activity.name);
  const pricingName = getMultiLanguageValue(orderItem.pricing.name);
  const buyerName = getBuyerNameFromCheckoutForm(orderItem.checkoutForm);
  const activityType = product.activity.type;
  const date = orderItem.date;
  const dateEnd = orderItem.dateEnd;
  const ActivityTypeIcon = getIconByType(activityType);

  return (
    <AccommodationOrderItemInfoCellLayout
      name={name}
      pricingName={pricingName}
      buyer={buyerName}
      activityTypeIcon={<ActivityTypeIcon />}
      activity={activityName}
      dateIcon={<CalendarIcon />}
      date={moment(date).format('DD/MM/yyyy')}
      dateEnd={moment(dateEnd).format('DD/MM/yyyy')}
    />
  );
};

export default AccommodationProductCell;
