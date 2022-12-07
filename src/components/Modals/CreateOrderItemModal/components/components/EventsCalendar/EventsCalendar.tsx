import React from 'react';
import moment from 'moment-timezone';
import { DateInput } from '@components/common/DateInput';

interface IEventsCalendarProps {
  date?: Date;
  minDate: Date;
  availableDates?: Set<string>;
  onDayChange(day: Date): void;
  onMonthChange(day: Date): void;
}

const EventsCalendar = ({ date, availableDates, onDayChange, onMonthChange, minDate }: IEventsCalendarProps) => {
  const isAvailableDay = (date: Date) =>
    availableDates?.size ? availableDates.has(moment(date).format('DD MMM YYYY')) : false;

  const local = moment(date);
  const timezoned = moment(date);
  const selected = moment(date).subtract(local.utcOffset() - timezoned.utcOffset(), 'minutes');

  return (
    <DateInput
      filterDate={isAvailableDay}
      onMonthChange={onMonthChange}
      selected={selected.toDate()}
      minDate={minDate}
      onChange={onDayChange}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default EventsCalendar;
