import React from 'react';

interface ICalendarLayoutProps {
  calendarIcon: React.ReactNode;
  // arrowIcon: React.ReactNode;
  calendar: React.ReactNode;
}

const classes = {
  wrapper: 'flex items-center space-x-0 sm:space-x-4',
  dates: 'flex',
  // arrowIcon: 'flex items-end py-1 mx-1 sm:mx-4',
  calendarIcon: 'hidden sm:block',
};

const CalendarLayout = ({ calendarIcon, calendar }: ICalendarLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.calendarIcon}>{calendarIcon}</div>
      <div className={classes.dates}>{calendar}</div>
    </div>
  );
};

export default CalendarLayout;
