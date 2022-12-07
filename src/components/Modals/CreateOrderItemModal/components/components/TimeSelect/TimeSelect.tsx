import React from 'react';
import moment from 'moment-timezone';
import { ClockIcon } from '@heroicons/react/solid';

import { Select } from '@components/common/Select';
import { IconTextOption } from '@components/common/Select/components';

interface IAvailableDates {
  date: Date;
  isAllDay: boolean;
  isMinPurchaseTimeValid: boolean;
  isMaxPurchaseTimeValid: boolean;
  availablePlaces: number;
  eventId: string;
}

interface ITimeSelectProps {
  availableDates: IAvailableDates[];
  allDay?: boolean;
  onChange(date: IAvailableDates): void;
  selectedDate?: IAvailableDates;
  text: string;
}

const TimeSelect = ({ allDay, availableDates, onChange, selectedDate, text }: ITimeSelectProps) => {
  if (allDay) {
    return null;
  }

  const handleChange = (val: string | number) => onChange(availableDates[parseInt(val as string)]);

  const options = availableDates
    .sort((a, b) => a.date.valueOf() - b.date.valueOf())
    .map(({ date, isMaxPurchaseTimeValid, isMinPurchaseTimeValid, eventId }, index) => ({
      value: index,
      disabled: !isMaxPurchaseTimeValid || !isMinPurchaseTimeValid || moment().isSameOrAfter(date),
      label: moment(date).format('HH:mm'),
      eventId: eventId,
    }));

  return (
    <Select
      onChange={handleChange}
      value={availableDates.findIndex(({ date }) => selectedDate?.date === date)}
      options={options}
      placeholder={text}
      tipText={text}
      renderSelectedOption={(
        opt: any, // TODO add typescript to FormField
      ) => <IconTextOption Icon={ClockIcon} {...opt} />}
    />
  );
};

export default TimeSelect;
