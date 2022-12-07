import { gql } from '@apollo/client';

import { ITicketProduct } from 'src/shared/interfaces/Product';

export interface IFirstTicketAvailableDatesRes {
  ticketProducts: ITicketProduct[];
}

export interface IFirstTicketAvailableDatesVars {
  activityId: string;
  productsIds: string[] | null;
  from: Date;
}

export const FIRST_TICKET_AVAILABLE_DATES = gql`
  query FirstTicketAvailableDates($activityId: ObjectId!, $productsIds: [ObjectId!], $from: Date!) {
    ticketProducts(activityId: $activityId, productsIds: $productsIds) {
      firstAvailableDate(from: $from)
    }
  }
`;
