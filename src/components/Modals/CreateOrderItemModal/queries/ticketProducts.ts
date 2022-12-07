import gql from 'graphql-tag';

import { ITicketProduct } from 'src/shared/interfaces/Product';

export interface ITicketProductsRes {
  ticketProducts: ITicketProduct[];
}

export interface ITicketProductsVars {
  activityId: string;
  from: Date | string | number;
  to: Date | string | number;
  productsIds?: string[] | null;
}

export const TICKET_PRODUCTS = gql`
  query TicketProducts($activityId: ObjectId!, $from: Date, $to: Date, $productsIds: [ObjectId!]) {
    ticketProducts(activityId: $activityId, productsIds: $productsIds) {
      id
      pricing {
        price
        comparedWithPrice
        id
        name {
          value
          lang
          country
        }
      }
      name {
        lang
        value
        country
      }

      events {
        availableDates(from: $from, to: $to) {
          date
          isMinPurchaseTimeValid
          isMaxPurchaseTimeValid
          availablePlaces
        }

        minPurchase
        maxPurchase
        allDay
        id
        availability
        type
      }
    }
  }
`;
