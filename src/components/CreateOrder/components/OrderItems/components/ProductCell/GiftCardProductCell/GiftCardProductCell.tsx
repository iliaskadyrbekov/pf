import React from 'react';
import { CalendarIcon } from '@heroicons/react/solid';

import GiftCardProductCellLayout from './GiftCardProductCellLayout';

import { getIconByType } from 'src/helpers';
import { FormLanguageContext } from 'src/context';
import { IGiftCardOrderItem } from 'src/shared/interfaces/OrderItem';
import { getBuyerNameFromCheckoutForm } from 'src/helpers/getBuyerNameFromCheckoutForm';

interface IGiftCardProductCellProps {
  orderItem: IGiftCardOrderItem;
}

const GiftCardProductCell = ({ orderItem }: IGiftCardProductCellProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { product } = orderItem;

  const name = getMultiLanguageValue(product.name);
  const activityName = getMultiLanguageValue(product.activity.name);
  const variationName = getMultiLanguageValue(orderItem.pricing.name);
  const buyerName = getBuyerNameFromCheckoutForm(orderItem.checkoutForm);
  const activityType = product.activity.type;

  const ActivityTypeIcon = getIconByType(activityType);

  return (
    <GiftCardProductCellLayout
      name={name}
      variation={variationName}
      buyer={buyerName}
      activityTypeIcon={<ActivityTypeIcon />}
      activity={activityName}
      dateIcon={<CalendarIcon />}
    />
  );
};

export default GiftCardProductCell;
