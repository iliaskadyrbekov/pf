import moment from 'moment-timezone';
import { IAccommodationProduct } from 'src/shared/interfaces';

export const getDatesFromStartMonthToEnd = (month: Date) => {
  const monthStart = moment(month).subtract(1, 'months').startOf('month').toDate();
  const monthEnd = moment(monthStart).add(2, 'months').endOf('month').toDate();

  return {
    from: moment().isSame(month, 'month')
      ? moment().startOf('day').toDate()
      : moment(monthStart).startOf('isoWeek').toDate(),
    to: moment(monthEnd).endOf('isoWeek').toDate(),
  };
};

export const getDatesFromPrevMonthToNext = (from: Date, to: Date) => {
  const monthStart = moment(from).subtract(1, 'months').startOf('month').toDate();
  const monthEnd = moment(to).add(1, 'months').endOf('month').toDate();

  return {
    from: moment().isSame(from, 'month')
      ? moment().startOf('day').toDate()
      : moment(monthStart).startOf('isoWeek').toDate(),
    to: moment(monthEnd).endOf('isoWeek').toDate(),
  };
};

export const getDateWithTimezone = (date?: Date) =>
  date
    ? moment(date)
        .subtract(moment(date).local().utcOffset() - moment(date).utcOffset(), 'minutes')
        .toDate()
    : date;

export const getAvailableAccommodationDatesSet = (products: IAccommodationProduct[]) => {
  return products.reduce<Set<string | Date>>((acc, { availableDays }) => {
    const availableDates = availableDays.map((date) => moment(date).format('DD MMM YYYY'));

    return new Set([...acc, ...availableDates]);
  }, new Set());
};
