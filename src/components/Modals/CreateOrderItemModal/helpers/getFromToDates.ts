import moment from 'moment-timezone';

export const getFromToDates = (today: Date) => {
  const monthStart = moment(today).startOf('month').toDate();
  const monthEnd = moment(monthStart).endOf('month').toDate();

  return {
    from: moment().isSame(today, 'month')
      ? moment().startOf('day').toDate()
      : moment(monthStart).startOf('isoWeek').toDate(),
    to: moment(monthEnd).endOf('isoWeek').toDate(),
  };
};
