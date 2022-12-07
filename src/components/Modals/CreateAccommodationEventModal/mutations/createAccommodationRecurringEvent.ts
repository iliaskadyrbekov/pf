import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { IAccommodationRecurringEvent } from 'src/shared/interfaces/AccommodationEvent';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { AccommodationEventFrequencyType } from 'src/shared/enums/EventFrequencyType';

export interface ICreateAccommodationRecurringEventsRes {
  createAccommodationRecurringEvent: IAccommodationRecurringEvent;
}

export interface ICreateAccommodationRecurringEventInput {
  product: string;
  quantity: number | null;
  freq: AccommodationEventFrequencyType;
  interval: number | null;
  byweekday: string[];
  dtstart: string | number | Date;
  until?: Date;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources?: { order: number; resource: string }[];
}

export interface ICreateAccommodationRecurringEventVars {
  shopId?: string;
  input: ICreateAccommodationRecurringEventInput;
}

export const CREATE_ACCOMMODATION_RECURRING_EVENT = gql`
  mutation CreateAccommodationRecurringEvent($shopId: ObjectId!, $input: CreateAccommodationRecurringEventInput!) {
    createAccommodationRecurringEvent(shopId: $shopId, input: $input) {
      id
      type
      quantity
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
          group {
            name
          }
        }
      }
      ... on AccommodationRecurringEvent {
        freq
        interval
        byweekday
        dtstart
        until
      }
    }
  }
`;

export const useCreateAccommodationRecurringEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<
    ICreateAccommodationRecurringEventsRes,
    ICreateAccommodationRecurringEventVars
  >(CREATE_ACCOMMODATION_RECURRING_EVENT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          accommodationEvents(exisingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.createAccommodationRecurringEvent,
              fragment: gql`
                fragment RecurringEventFields on AccommodationEvent {
                  id
                  type
                  quantity
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
                      group {
                        name
                      }
                    }
                  }
                  ... on AccommodationRecurringEvent {
                    freq
                    interval
                    byweekday
                    dtstart
                    until
                  }
                }
              `,
            });

            return [...exisingItems, newItemRef];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
