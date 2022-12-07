import React from 'react';
import moment from 'moment-timezone';
import { useLazyQuery } from '@apollo/client';

import EventsCalendar from '../../../components/EventsCalendar/EventsCalendar';

import { getFromToDates } from '@components/Modals/CreateOrderItemModal/helpers/getFromToDates';
import { getRentalAvailableDatesSet } from '@components/Modals/CreateOrderItemModal/helpers/getRentalAvailableDatesSet';
import {
  RENTAL_EVENTS_DAYS,
  IRentalEventsDaysRes,
  IRentalEventsDaysVars,
} from '@components/Modals/CreateOrderItemModal/queries/rentalEventsDays';

interface ICalendarProps {
  activityId: string;
  date?: Date;
  onDayChange(day: Date): void;
}

const Calendar = ({ activityId, date, onDayChange }: ICalendarProps) => {
  const [getProducts, { data }] = useLazyQuery<IRentalEventsDaysRes, IRentalEventsDaysVars>(RENTAL_EVENTS_DAYS);

  React.useEffect(() => {
    if (!date) {
      return;
    }

    const { from, to } = getFromToDates(date);

    getProducts({
      variables: {
        activityId,
        from,
        to,
        // productsIds: productIds ? [productIds] : null,
      },
    });
  }, [date /* ,productIds */]);

  const availableDates = data?.rentalProducts
    ? getRentalAvailableDatesSet(data.rentalProducts, 'DD MMM YYYY')
    : undefined;

  const handleMonthChange = (month: Date) => {
    const { from, to } = getFromToDates(month);

    getProducts({
      variables: {
        activityId,
        from,
        to,
        // productsIds: productIds ? [productIds] : null,
      },
    });
  };

  const handleChangeDay = (date: Date) => {
    const day = moment(date).startOf('day').toDate();

    onDayChange(day);
  };

  return (
    <EventsCalendar
      date={date}
      availableDates={availableDates}
      onDayChange={handleChangeDay}
      onMonthChange={handleMonthChange}
      minDate={new Date()}
    />
  );
};

export default Calendar;
