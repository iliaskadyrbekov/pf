import React from 'react';
import moment from 'moment-timezone';
import { useApollo } from 'src/lib/apolloClient';

import { Calendar, Events } from './components';
import { SpinnerIcon } from '@components/Icons';
import ActivityEventsContainerLayout from './AccommodationEventsContainerLayout';

import { getNextDateAfterCurrent } from './helpers';
import { IAccommodationProduct } from 'src/shared/interfaces';
import { AccommodationSpecificationType } from 'src/shared/enums';
import {
  FIRST_ACCOMMODATION_AVAILABLE_DAY,
  IFirstAccommodationAvailableDayRes,
  IFirstAccommodationAvailableDayVars,
} from './mutations';

export interface ISpecificationFilterOption {
  type: AccommodationSpecificationType;
  name: string;
  value: number;
  remain: number;
}

interface IAccommodationEventsContainerProps {
  activityId: string;
}

const AccommodationEventsContainer = ({ activityId }: IAccommodationEventsContainerProps) => {
  const client = useApollo();

  const [toDate, setToDate] = React.useState<Date>();
  const [fromDate, setFromDate] = React.useState<Date>();

  const getInitialData = async () => {
    const currentStartOfDay = moment().startOf('day').toDate();

    const { data } = await client.query<IFirstAccommodationAvailableDayRes, IFirstAccommodationAvailableDayVars>({
      query: FIRST_ACCOMMODATION_AVAILABLE_DAY,
      variables: {
        activityId,
        from: currentStartOfDay,
      },
    });

    const productsWithFirstAvailableDays = data.accommodationProducts
      .reduce(
        (acc: Date[], product: IAccommodationProduct) =>
          product.firstAvailableDay ? [...acc, product.firstAvailableDay] : acc,
        [],
      )
      .sort();

    if (!productsWithFirstAvailableDays.length) {
      setFromDate(currentStartOfDay);
      setToDate(getNextDateAfterCurrent(currentStartOfDay));
    }

    const firstAvailableDate = productsWithFirstAvailableDays[0];

    setFromDate(moment(firstAvailableDate).startOf('day').toDate());
    setToDate(getNextDateAfterCurrent(firstAvailableDate));
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  return (
    <ActivityEventsContainerLayout
      datePicker={
        <Calendar
          from={fromDate}
          to={toDate}
          activityId={activityId}
          onStartDateChange={setFromDate}
          onEndDateChange={setToDate}
        />
      }
      events={fromDate && toDate ? <Events to={toDate} from={fromDate} activityId={activityId} /> : null}
      loader={!toDate || !fromDate ? <SpinnerIcon /> : null}
    />
  );
};

export default AccommodationEventsContainer;
