import gql from 'graphql-tag';

import { ITicketProduct } from 'src/shared/interfaces/Product';

export interface ITicketEventsDaysRes {
  ticketProducts: ITicketProduct[];
}

export interface ITicketEventsDaysVars {
  activityId: string;
  from: Date | string | number;
  to: Date | string | number;
  productsIds?: string[] | null;
}

export const TICKET_EVENTS_DAYS = gql`
  query TicketEventsDays($activityId: ObjectId!, $from: Date, $to: Date, $productsIds: [ObjectId!]) {
    ticketProducts(activityId: $activityId, productsIds: $productsIds) {
      events {
        availableDates(from: $from, to: $to) {
          date
        }
      }
    }
  }
`;
