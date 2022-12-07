import moment from 'moment-timezone';
import { ITicketProduct } from 'src/shared/interfaces/Product';

export const getTicketAvailableDatesSet = (products: ITicketProduct[], format: string) => {
  return products.reduce<Set<string>>((acc, { events }) => {
    const eventAvailableDates = events.flatMap(({ availableDates }) =>
      availableDates.map(({ date }) => moment(date).format(format)),
    );
    return new Set([...acc, ...eventAvailableDates]);
  }, new Set());
};
