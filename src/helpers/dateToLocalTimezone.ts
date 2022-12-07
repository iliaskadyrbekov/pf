import moment from 'moment-timezone';

export const dateToLocalTimezone = (date: Date) =>
  moment(date)
    .subtract(moment(date).local().utcOffset() - moment(date).utcOffset(), 'minutes')
    .toDate();
