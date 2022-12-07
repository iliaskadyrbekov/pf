import React from 'react';

import { TWeekday } from 'src/shared/types/Weekday';
import { DayLayout } from '../Day';

import WeekDaysLayout from './WeekDaysLayout';

export interface IWeekDaysProps {
  label: React.ReactNode;
  value: TWeekday[];
  isError: boolean;
  onChange: (day: TWeekday) => void;
}

const WeekDays = ({ label, onChange, value }: IWeekDaysProps) => {
  const weekDays: TWeekday[] = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

  return (
    <WeekDaysLayout
      label={label}
      days={weekDays.map((day, index) => (
        <DayLayout isActive={value && value.some((v) => v === day)} onClick={() => onChange(day)} key={index}>
          {day.toLocaleUpperCase()}
        </DayLayout>
      ))}
    />
  );
};

export default WeekDays;
