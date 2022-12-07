import React from 'react';
import moment from 'moment-timezone';
import { useLazyQuery } from '@apollo/client';

import EventsCalendar from '../../../components/EventsCalendar/EventsCalendar';

import { getFromToDates } from '@components/Modals/CreateOrderItemModal/helpers/getFromToDates';
import {
  ITicketEventsDaysRes,
  ITicketEventsDaysVars,
  TICKET_EVENTS_DAYS,
} from '@components/Modals/CreateOrderItemModal/queries/ticketEventsDays';
import { getTicketAvailableDatesSet } from '@components/Modals/CreateOrderItemModal/helpers/getTicketAvailableDatesSet';

interface ICalendarProps {
  activityId: string;
  date?: Date;
  onDayChange(day: Date): void;
}

const Calendar = ({ activityId, date, onDayChange }: ICalendarProps) => {
  const [getProducts, { data }] = useLazyQuery<ITicketEventsDaysRes, ITicketEventsDaysVars>(TICKET_EVENTS_DAYS);

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

  const availableDates = data?.ticketProducts
    ? getTicketAvailableDatesSet(data.ticketProducts, 'DD MMM YYYY')
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
