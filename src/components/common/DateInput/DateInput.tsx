import React from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';

import { InputLeftIconLayout } from '../FormFields/FormPricingField/components';
import { Input } from '../Input';

interface IDateInputProps {
  label?: string;
  startDate?: Date;
  dateFormat?: string;
  endDate?: Date;
  selected?: Date;
  selectsRange?: boolean;
  wrapperClassName?: string;
  placeholder?: string;
  minDate?: Date;
  disabled?: boolean;
  onChange(date: [Date, Date] | Date): void;
  filterDate?(date: Date): boolean;
  onMonthChange?(date: Date): void;
}

const DateInput = ({
  label,
  startDate,
  endDate,
  selected,
  selectsRange,
  dateFormat,
  placeholder,
  minDate,
  disabled,
  onChange,
  filterDate,
  onMonthChange,
}: IDateInputProps) => {
  const setLocalZone = (date: Date) => {
    const dateWithoutZone = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS');
    const localZone = moment(dateWithoutZone).local().format('Z');
    const dateWithLocalZone = [dateWithoutZone, localZone].join('');

    return new Date(dateWithLocalZone);
  };

  const setOtherZone = (date: Date) => {
    const dateWithoutZone = moment(date).local().format('YYYY-MM-DDTHH:mm:ss.SSS');
    const otherZone = moment(date).format('Z');
    const dateWithOtherZone = [dateWithoutZone, otherZone].join('');

    return new Date(dateWithOtherZone);
  };

  const handleChange = (date: [Date, Date] | Date) => {
    if (Array.isArray(date)) {
      const dates = date.map((d) => d && setOtherZone(d)) as [Date, Date];
      return onChange(dates);
    }

    return onChange(setOtherZone(date));
  };

  return (
    <div className="w-full">
      <DatePicker
        disabled={disabled}
        filterDate={filterDate}
        wrapperClassName="w-full h-full"
        dateFormat={dateFormat}
        onChange={handleChange}
        startDate={startDate && setLocalZone(startDate)}
        endDate={endDate && setLocalZone(endDate)}
        selectsRange={selectsRange}
        onMonthChange={onMonthChange}
        selected={selected && setLocalZone(selected)}
        placeholderText={placeholder}
        minDate={minDate}
        customInput={
          <Input
            label={label}
            className="pl-8"
            leftElement={<InputLeftIconLayout>{<CalendarIcon className="w-4 h-4" />}</InputLeftIconLayout>}
          />
        }
      />
    </div>
  );
};

export default DateInput;
