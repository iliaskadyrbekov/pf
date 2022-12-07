import React from 'react';
import moment from 'moment-timezone';

import {
  DescriptionList,
  DescriptionListItems,
  DescriptionListTitle,
  DescriptionListItem,
} from '../../../../../common/DescriptionList';
import { IRentalOrderItem } from 'src/shared/interfaces';
import { FormLanguageContext } from 'src/context';
import { MainInfo } from '../../../components';
import { Attendees } from '../Attendees';

interface IRentalBookingsInfoProps {
  orderItems: IRentalOrderItem[];
}

const RentalBookingsInfo = ({ orderItems }: IRentalBookingsInfoProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const mainInfo = orderItems[0];

  const activityName = getMultiLanguageValue(mainInfo.event.product.activity.name);
  const productName = getMultiLanguageValue(mainInfo.event.product.name);
  const dateStart = moment(mainInfo.date).format('D MMM HH:mm');
  const dateEnd = moment(mainInfo.dateEnd).format('D MMM HH:mm');
  const booked = orderItems.length;
  const availability = mainInfo.event.quantity || 'Unlimited';

  return (
    <DescriptionList>
      <DescriptionListTitle subTitle={productName} title={activityName} />
      <DescriptionListItems>
        <MainInfo dateStart={dateStart} dateEnd={dateEnd} booked={booked} available={availability} />
        <DescriptionListItem
          colSpan={{ default: 'col-span-2' }}
          label="Attendees"
          item={<Attendees orderItems={orderItems} />}
        />
      </DescriptionListItems>
    </DescriptionList>
  );
};

export default RentalBookingsInfo;
