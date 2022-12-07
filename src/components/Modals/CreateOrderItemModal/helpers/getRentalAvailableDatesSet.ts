import moment from 'moment-timezone';
import { IRentalProduct } from 'src/shared/interfaces/Product';

export const getRentalAvailableDatesSet = (products: IRentalProduct[], format: string) => {
  return products.reduce<Set<string>>((acc, { events }) => {
    const eventAvailableDates = events.flatMap(({ availableDays }) =>
      availableDays?.map((date) => moment(date).format(format)),
    );
    return new Set([...acc, ...eventAvailableDates]);
  }, new Set());
};
