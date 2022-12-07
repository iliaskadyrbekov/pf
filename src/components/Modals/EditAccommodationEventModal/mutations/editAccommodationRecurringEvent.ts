import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { IAccommodationRecurringEvent } from 'src/shared/interfaces/AccommodationEvent';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { AccommodationEventFrequencyType } from 'src/shared/enums/EventFrequencyType';

export interface IEditAccommodationRecurringEventInput {
  byweekday?: string[];
  connectedResources?: { order: number; resource: string }[];
  dtstart?: string | number | Date;
  exdate?: Date[];
  freq?: AccommodationEventFrequencyType;
  id: string;
  interval?: number;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  quantity?: number | null;
  until?: Date;
}

export interface IEditAccommodationRecurringEventsRes {
  editAccommodationRecurringEvent: IAccommodationRecurringEvent;
}

export interface IEditAccommodationRecurringEventVars {
  shopId?: string;
  input: IEditAccommodationRecurringEventInput;
}

export const EDIT_ACCOMMODATION_RECURRING_EVENT = gql`
  mutation EditAccommodationRecurringEvent($shopId: ObjectId!, $input: EditAccommodationRecurringEventInput!) {
    editAccommodationRecurringEvent(shopId: $shopId, input: $input) {
      id
      quantity
      minPurchase
      maxPurchase
      availability
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
      freq
      interval
      byweekday
      dtstart
      until
      exdate
    }
  }
`;

export const useEditAccommodationRecurringEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<
    IEditAccommodationRecurringEventsRes,
    IEditAccommodationRecurringEventVars
  >(EDIT_ACCOMMODATION_RECURRING_EVENT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          accommodationEvents(exisingItems = []) {
            cache.writeFragment({
              data: data?.editAccommodationRecurringEvent,
              fragment: gql`
                fragment RecurringEventFields on RecurringEvent {
                  id
                  quantity
                  freq
                  interval
                  byweekday
                  dtstart
                  until
                  exdate
                  minPurchase
                  maxPurchase
                  availability
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
                  minPurchaseTime {
                    type
                    value
                  }
                  maxPurchaseTime {
                    type
                    value
                  }
                }
              `,
            });

            return exisingItems;
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
