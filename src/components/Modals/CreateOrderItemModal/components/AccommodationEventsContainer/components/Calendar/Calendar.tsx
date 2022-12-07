import React from 'react';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import { useLazyQuery } from '@apollo/client';
import { CalendarIcon } from '@heroicons/react/outline';

import CalendarLayout from './CalendarLayout';
import { DateButtonLayout } from './components';

import {
  getAvailableAccommodationDatesSet,
  getDatesFromPrevMonthToNext,
  getDatesFromStartMonthToEnd,
  getDateWithTimezone,
} from './helpers';
import {
  ACCOMMODATION_AVAILABLE_DAYS,
  IAccommodationAvailableDaysRes,
  IAccommodationAvailableDaysVars,
} from '@components/Modals/CreateOrderItemModal/queries/accommodationAvailableDays';

export interface IEventsCalendarProps {
  from?: Date;
  to?: Date;
  onEndDateChange(date?: Date): void;
  onStartDateChange(date?: Date): void;
  activityId: string;
}

export const Calendar = ({ from, to, onStartDateChange, onEndDateChange, activityId }: IEventsCalendarProps) => {
  const didMountRef = React.useRef<boolean>(false);
  const [getAvailableDays, { data }] = useLazyQuery<IAccommodationAvailableDaysRes, IAccommodationAvailableDaysVars>(
    ACCOMMODATION_AVAILABLE_DAYS,
  );

  React.useEffect(() => {
    getAvailableDates();
  }, [activityId]);

  React.useEffect(() => {
    if (didMountRef.current || !from || !to) {
      return;
    }

    getAvailableDates();

    didMountRef.current = true;
  }, [from, to]);

  const getAvailableDates = () => {
    if (!from || !to) {
      return;
    }

    const { from: fromDate, to: toDate } = getDatesFromPrevMonthToNext(from, to);

    getAvailableDays({
      variables: {
        activityId,
        from: fromDate,
        to: toDate,
      },
    });
  };

  const availableDates = data?.accommodationProducts
    ? getAvailableAccommodationDatesSet(data.accommodationProducts)
    : new Set();

  const isAvailableDay = (date: Date) =>
    availableDates?.size ? availableDates.has(moment(date).local().format('DD MMM YYYY')) : false;

  const handleMonthChange = (month: Date) => {
    const { from, to } = getDatesFromStartMonthToEnd(month);

    getAvailableDays({
      variables: {
        activityId,
        from,
        to,
      },
    });
  };

  const onChange = React.useCallback(
    async (dates) => {
      const [start, end] = dates;

      const startDay = moment(moment(start).local().format('DD-MM-YYYY'), 'DD-MM-YYYY').startOf('day').toDate();
      const endDay = end
        ? moment(moment(end).local().format('DD-MM-YYYY'), 'DD-MM-YYYY').endOf('day').toDate()
        : undefined;

      onStartDateChange(startDay);
      onEndDateChange(endDay);
    },
    [to, from, onStartDateChange, onEndDateChange],
  );

  return (
    <CalendarLayout
      calendarIcon={<CalendarIcon width="24" height="24" className="text-[#4F49F5]" />}
      calendar={
        <DatePicker
          filterDate={isAvailableDay}
          onMonthChange={handleMonthChange}
          minDate={getDateWithTimezone(new Date())}
          startDate={getDateWithTimezone(from)}
          endDate={getDateWithTimezone(to)}
          dateFormat="dd/MM/yyyy"
          monthsShown={2}
          selectsRange
          onChange={onChange}
          customInput={<DateButtonLayout checkInLabel="Check-in" checkOutLabel="Check-out" />}
        />
      }
    />
  );
};

export default Calendar;
