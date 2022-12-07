import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { EventType } from 'src/shared/enums/EventType';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { IOneTimeEvent } from 'src/shared/interfaces/TicketEvent';

export interface ICreateOneTimeEventsRes {
  createOneTimeEvent: IOneTimeEvent;
}

export interface ICreateOneTimeEventInput {
  type: EventType;
  product: string;
  allDay: boolean;
  quantity: number | null;
  startDate: Date;
  endDate?: Date;
  minPurchase: number | null;
  maxPurchase: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources?: { order: number; resource: string }[];
}

export interface ICreateOneTimeEventVars {
  shopId?: string;
  input: ICreateOneTimeEventInput;
}

export const CREATE_ONE_TIME_EVENT = gql`
  mutation CreateOneTimeEvent($shopId: ObjectId!, $input: CreateOneTimeEventDto!) {
    createOneTimeEvent(shopId: $shopId, input: $input) {
      event {
        ... on OneTimeEvent {
          id
          type
          allDay
          quantity
          startDate
          endDate
          minPurchase
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

export const useCreateOneTimeEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<ICreateOneTimeEventsRes, ICreateOneTimeEventVars>(
    CREATE_ONE_TIME_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            events(exisingItems = []) {
              const newItemRef = cache.writeFragment({
                data: data?.createOneTimeEvent,
                fragment: gql`
                  fragment OneTimeEventFields on Event {
                    event {
                      ... on OneTimeEvent {
                        id
                        type
                        allDay
                        quantity
                        startDate
                        endDate
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
