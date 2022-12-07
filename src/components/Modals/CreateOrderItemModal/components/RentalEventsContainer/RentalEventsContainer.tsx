import React from 'react';
import moment from 'moment-timezone';

import { Calendar, Events } from './components';
import RentalEventsContainerLayout from './RentalEventsContainerLayout';

import { useApollo } from 'src/lib/apolloClient';
import { getInitialDate } from '../../helpers/getInitialDate';

import {
  IFirstRentalAvailableDatesRes,
  IFirstRentalAvailableDatesVars,
  FIRST_RENTAL_AVAILABLE_DATES,
} from 'src/graphql/queries/firstRentalAvailableDates';

interface IRentalEventsContainerProps {
  activityId: string;
}

const RentalEventsContainer = ({ activityId }: IRentalEventsContainerProps) => {
  const client = useApollo();

  const [currentDate, setCurrentDate] = React.useState<Date>();
  const [currentProductId] = React.useState<null | string>(null);

  const getInitialData = async () => {
    const { data } = await client.query<IFirstRentalAvailableDatesRes, IFirstRentalAvailableDatesVars>({
      query: FIRST_RENTAL_AVAILABLE_DATES,
      variables: {
        activityId,
        from: moment().startOf('day').toDate(),
        // productsIds: currentProductId ? [currentProductId] : null,
        productsIds: null,
      },
    });

    setCurrentDate(getInitialDate(data.rentalProducts));
  };

  React.useEffect(() => {
    getInitialData();
  }, []);

  // const handleDateChange = (date: Date) => {
  //   setCurrentDate(date);
  // };

  return (
    <RentalEventsContainerLayout
      datePicker={<Calendar activityId={activityId} date={currentDate} onDayChange={setCurrentDate} />}
      events={<Events date={currentDate} productId={currentProductId} activityId={activityId} />}
    />
  );
};

export default RentalEventsContainer;
