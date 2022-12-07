import moment from 'moment';
import React from 'react';

import {
  DescriptionList,
  DescriptionListTitle,
  DescriptionListItems,
  DescriptionListItem,
} from '@components/common/DescriptionList';
import { FormLanguageContext } from 'src/context';
import { IAccommodationOrderItem } from 'src/shared/interfaces';
import { Attendees } from '../Attendees';

interface IAccommodationBookingsInfoProps {
  orderItems: IAccommodationOrderItem[];
}

const AccommodationBookingsInfo = ({ orderItems }: IAccommodationBookingsInfoProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const mainInfo = orderItems[0];

  const activityName = getMultiLanguageValue(mainInfo.product.activity.name);
  const productName = getMultiLanguageValue(mainInfo.product.name);
  const dateStart = moment(mainInfo.date).format('D MMM HH:mm');
  const dateEnd = moment(mainInfo.dateEnd).format('D MMM HH:mm');

  return (
    <DescriptionList>
      <DescriptionListTitle subTitle={productName} title={activityName} />
      <DescriptionListItems>
        <DescriptionListItem key="date-time" label="Date & time" item={`${dateStart} - ${dateEnd}`} />
        <DescriptionListItem
          colSpan={{ default: 'col-span-2' }}
          label="Attendees"
          item={<Attendees orderItems={orderItems} />}
        />
      </DescriptionListItems>
    </DescriptionList>
  );
};

export default AccommodationBookingsInfo;
