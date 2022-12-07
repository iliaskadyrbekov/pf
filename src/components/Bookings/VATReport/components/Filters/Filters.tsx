import React, { useState } from 'react';
import moment from 'moment-timezone';

import FiltersLayout from './FiltersLayout';
import { DateInput } from '@components/common/DateInput';
import { Select } from '@components/common/Select';

interface IFilters {
  activity?: string;
  date: {
    from: Date;
    to: Date;
  };
}

interface IFiltersProps {
  filters: IFilters;
  activitiesOptions: { value: string; label: string }[];
  onChange(filters: Partial<IFilters>): void;
}

const Filters = ({ filters, activitiesOptions, onChange }: IFiltersProps) => {
  const [date, setDate] = useState({ from: filters.date.from, to: filters.date.to });

  const handleDateFilterChange = (dates: [Date, Date]) => {
    setDate({ from: dates[0], to: dates[1] });

    if (dates[0] && dates[1]) {
      onChange({
        date: { from: moment(dates[0]).startOf('day').toDate(), to: moment(dates[1]).endOf('day').toDate() },
      });
    }
  };

  const handleActivitiesFilterChange = (activity?: string) => {
    onChange({ activity });
  };

  return (
    <FiltersLayout
      dateRange={
        <DateInput
          wrapperClassName="w-full h-full"
          dateFormat="dd/MM/yyyy"
          selectsRange={true}
          onChange={handleDateFilterChange}
          startDate={date.from}
          endDate={date.to}
          label="Date range"
        />
      }
      activity={
        <Select
          value={filters.activity}
          options={[{ label: 'All activities', value: undefined }, ...activitiesOptions]}
          onChange={handleActivitiesFilterChange}
          wrapperClassName="w-72"
          label="Category"
        />
      }
    />
  );
};

export default Filters;
