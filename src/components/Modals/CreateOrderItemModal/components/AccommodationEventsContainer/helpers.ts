import moment from 'moment-timezone';

import { TariffType } from 'src/shared/enums';

export const getNextDateAfterCurrent = (startDate: Date) => moment(startDate).add(1, 'days').endOf('day').toDate();

export const accommodationTariffs = {
  [TariffType.PER_DAY]: 'Per Day',
  [TariffType.PER_NIGHT]: 'Per Night',
};
