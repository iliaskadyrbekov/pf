import moment from 'moment-timezone';

export const zonedTimeToUtc = (date: Date, timezone?: string) => {
  if (!timezone) {
    return date;
  }

  const offset = moment.tz.zone(timezone)?.utcOffset(date.valueOf());

  if (offset) {
    const millisecondsOffset = offset * 60 * 1000;
    return new Date(date.getTime() + millisecondsOffset);
  } else {
    return date;
  }
};
