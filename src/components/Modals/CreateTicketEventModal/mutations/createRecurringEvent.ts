import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { EventFrequencyType } from 'src/shared/enums/EventFrequencyType';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { IRecurringEvent } from 'src/shared/interfaces/TicketEvent';

export interface ICreateRecurringEventsRes {
  createRecurringEvent: IRecurringEvent;
}

export interface ICreateRecurringEventInput {
  product: string;
  quantity: number | null;
  freq: EventFrequencyType;
  interval: number;
  byweekday: string[];
  dtstart: string | number | Date;
  until?: Date;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources?: { order: number; resource: string }[];
  tzid?: string;
}

export interface ICreateRecurringEventVars {
  shopId?: string;
  input: ICreateRecurringEventInput;
}

export const CREATE_RECURRING_EVENT = gql`
  mutation CreateRecurringEvent($shopId: ObjectId!, $input: CreateRecurringEventDto!) {
    createRecurringEvent(shopId: $shopId, input: $input) {
      event {
        ... on RecurringEvent {
          id
          type
          quantity
          freq
          interval
          byweekday
          dtstart
          until
          minPurchase
          tzid
          maxPurchase
          connectedResources {
            order
            resource {
              id
              name {
                lang
                value
                country
              }
              availability
            }
          }
          minPurchaseTime {
            type
            value
          }
          maxPurchaseTime {
            type
            value
          }
        }
      }
    }
  }
`;

export const useCreateRecurringEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateRecurringEventsRes, ICreateRecurringEventVars>(
    CREATE_RECURRING_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            events(exisingItems = []) {
              const newItemRef = cache.writeFragment({
                data: data?.createRecurringEvent,
                fragment: gql`
                  fragment RecurringEventFields on Event {
                    event {
                      ... on RecurringEvent {
                        id
                        type
                        quantity
                        freq
                        tzid
                        interval
                        byweekday
                        dtstart
                        until
                        minPurchase
                        maxPurchase
                        minPurchaseTime {
                          type
                          value
                        }
                        maxPurchaseTime {
                          type
                          value
                        }
                        connectedResources {
                          order
                          resource {
                            id
                            name {
                              lang
                              value
                              country
                            }
                            availability
                          }
                        }
                      }
                    }
                  }
                `,
              });

              return [...exisingItems, newItemRef];
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
