import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { CustomSelect } from '@components/Modals/CreateOrderItemModal/components/components';
import { OptionLayout } from '@components/Modals/CreateOrderItemModal/components/components/CustomSelect/components';

import { useCustomField } from 'src/lib/useCustomField';

interface IStartTimeSelectProps {
  name: string;
  availableDates: IAvailableDates[];
  text: string;
  onChange?(date: Date): void;
}

interface IAvailableDates {
  date: Date;
  formatDate: string;
  isDisabled: boolean;
}

const StartTimeSelect = ({ name, availableDates, text, onChange }: IStartTimeSelectProps) => {
  const [{ value }, {}, { setValue }] = useCustomField<Date, string[]>(name);

  const handleDateChange = React.useCallback(
    (formatDate) => {
      const currentDate = availableDates.find((item) => item.formatDate === formatDate)?.date || value;
      setValue(currentDate);
      onChange && onChange(currentDate);
    },
    [value, setValue],
  );

  const selected = availableDates.find((item) => item.date === value)?.formatDate || '';

  return (
    <CustomSelect
      selected={selected}
      setSelected={handleDateChange}
      rightIcon={
        <ChevronDownIcon
          className="h-5 w-5 text-[#2A2C32] group-hover:text-indigo-600 transition duration-300 ease-in-out"
          aria-hidden="true"
        />
      }
      listBox={availableDates.map(({ formatDate, isDisabled }) => (
        <OptionLayout
          name={formatDate}
          value={formatDate}
          isActive={formatDate === selected}
          isDisabled={isDisabled}
          key={formatDate}
        />
      ))}
      tipText={text}
    />
  );
};

export default StartTimeSelect;
