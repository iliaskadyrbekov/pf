import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { IOneTimeEvent } from 'src/shared/interfaces/TicketEvent';

export interface IEditOneTimeEventsRes {
  editOneTimeEvent: IOneTimeEvent;
}

export interface IEditOneTimeEventInput {
  id: string;
  product?: string;
  quantity?: number | null;
  startTime?: string;
  endTime?: string;
  startDate?: Date;
  endDate?: Date;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources?: { order: number; resource: string }[];
}

export interface IEditOneTimeEventVars {
  shopId?: string;
  input: IEditOneTimeEventInput;
}

export const EDIT_ONE_TIME_EVENT = gql`
  mutation EditOneTimeEvent($shopId: ObjectId!, $input: EditOneTimeEventInput!) {
    editOneTimeEvent(shopId: $shopId, input: $input) {
      id
      type
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
      startDate
      endDate
    }
  }
`;

export const useEditOneTimeEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<IEditOneTimeEventsRes, IEditOneTimeEventVars>(
    EDIT_ONE_TIME_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            rentalEvents(exisingItems = []) {
              cache.writeFragment({
                data: data?.editOneTimeEvent,
                fragment: gql`
                  fragment OneTimeEventFields on OneTimeEvent {
                    id
                    quantity
                    startDate
                    endDate
                    availability
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
