import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { EventFrequencyType } from 'src/shared/enums/EventFrequencyType';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { IRecurringEvent } from 'src/shared/interfaces/TicketEvent';

export interface IEditRecurringEventsRes {
  editRecurringEvent: IRecurringEvent;
}

export interface IEditRecurringEventInput {
  id: string;
  exdate?: Date[];
  quantity?: number | null;
  startTime?: string;
  endTime?: string;
  freq?: EventFrequencyType;
  interval?: number;
  byweekday?: string[];
  dtstart?: string | number | Date;
  until?: Date;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  connectedResources?: { order: number; resource: string }[];
}

export interface IEditRecurringEventVars {
  shopId?: string;
  input: IEditRecurringEventInput;
}

export const EDIT_RECURRING_EVENT = gql`
  mutation EditRecurringEvent($shopId: ObjectId!, $input: EditRecurringEventInput!) {
    editRecurringEvent(shopId: $shopId, input: $input) {
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
          availability
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

export const useEditRecurringEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditRecurringEventsRes, IEditRecurringEventVars>(
    EDIT_RECURRING_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            events(exisingItems = []) {
              cache.writeFragment({
                data: data?.editRecurringEvent,
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
                `,
              });

              return exisingItems;
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
