import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { IAccommodationOneTimeEvent } from 'src/shared/interfaces/AccommodationEvent';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';

export interface IEditAccommodationOneTimeEventInput {
  id: string;
  quantity?: number | null;
  startDate?: Date;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources?: { order: number; resource: string }[];
}

export interface IEditAccommodationOneTimeEventsRes {
  editAccommodationOneTimeEvent: IAccommodationOneTimeEvent;
}

export interface IEditAccommodationOneTimeEventVars {
  shopId?: string;
  input: IEditAccommodationOneTimeEventInput;
}

export const EDIT_ACCOMMODATION_ONE_TIME_EVENT = gql`
  mutation EditAccommodationOneTimeEvent($shopId: ObjectId!, $input: EditAccommodationOneTimeEventInput!) {
    editAccommodationOneTimeEvent(shopId: $shopId, input: $input) {
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
          group {
            name
          }
        }
      }
      startDate
    }
  }
`;

export const useEditAccommodationOneTimeEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<
    IEditAccommodationOneTimeEventsRes,
    IEditAccommodationOneTimeEventVars
  >(EDIT_ACCOMMODATION_ONE_TIME_EVENT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          accommodationEvents(exisingItems = []) {
            cache.writeFragment({
              data: data?.editAccommodationOneTimeEvent,
              fragment: gql`
                fragment OneTimeEventFields on OneTimeEvent {
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
                      group {
                        name
                      }
                    }
                  }
                  startDate
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
