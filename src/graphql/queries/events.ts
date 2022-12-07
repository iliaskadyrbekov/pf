import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { IEvent } from 'src/shared/interfaces/TicketEvent';
import { EVENT_FIELDS } from '../fragments/event';

export interface IEventsVars {
  productId: string;
}

export interface IEventsRes {
  events: IEvent[];
}

export const EVENTS = gql`
  ${EVENT_FIELDS}
  query Events($productId: ObjectId!) {
    events(productId: $productId) {
      ...EventFields
    }
  }
`;

export const useEventsQuery = (vars: IEventsVars) => {
  return useQuery<IEventsRes, IEventsVars>(EVENTS, {
    variables: vars,
  });
};
