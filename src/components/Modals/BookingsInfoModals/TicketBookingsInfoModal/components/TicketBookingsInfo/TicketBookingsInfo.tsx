import moment from 'moment';
import React from 'react';

import {
  DescriptionList,
  DescriptionListTitle,
  DescriptionListItems,
  DescriptionListItem,
} from '@components/common/DescriptionList';
import { FormLanguageContext } from 'src/context';
import { ITicketOrderItem } from 'src/shared/interfaces';
import { MainInfo } from '../../../components';
import { Attendees } from '../Attendees';

interface ITicketBookingsInfoProps {
  orderItems: ITicketOrderItem[];
}

const TicketBookingsInfo = ({ orderItems }: ITicketBookingsInfoProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const mainInfo = orderItems[0];

  const activityName = getMultiLanguageValue(mainInfo.event.product.activity.name);
  const productName = getMultiLanguageValue(mainInfo.event.product.name);
  const dateStart = moment(mainInfo.date).format('D MMM HH:mm');
  const dateEnd = moment(mainInfo.dateEnd).format('D MMM HH:mm');
  const booked = orderItems.length;
  const availability = mainInfo.event.availability || 'Unlimited';

  return (
    <DescriptionList>
      <DescriptionListTitle subTitle={productName} title={activityName} />
      <DescriptionListItems>
        <MainInfo dateStart={dateStart} booked={booked} dateEnd={dateEnd} available={availability} />
        <DescriptionListItem
          colSpan={{ default: 'col-span-2' }}
          label="Attendees"
          item={<Attendees orderItems={orderItems} />}
        />
      </DescriptionListItems>
    </DescriptionList>
  );
};

export default TicketBookingsInfo;
