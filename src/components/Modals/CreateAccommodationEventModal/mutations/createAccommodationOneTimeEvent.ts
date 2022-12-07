import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { IAccommodationOneTimeEvent } from 'src/shared/interfaces/AccommodationEvent';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';

export interface ICreateAccommodationOneTimeEventInput {
  startDate: Date;
  quantity?: number | null;
  product: string;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources?: { order: number; resource: string }[];
}

export interface ICreateAccommodationOneTimeEventsRes {
  createAccommodationOneTimeEvent: IAccommodationOneTimeEvent;
}

export interface ICreateAccommodationOneTimeEventVars {
  shopId?: string;
  input: ICreateAccommodationOneTimeEventInput;
}

export const CREATE_ACCOMMODATION_ONE_TIME_EVENT = gql`
  mutation CreateAccommodationOneTimeEvent($shopId: ObjectId!, $input: CreateAccommodationOneTimeEventInput!) {
    createAccommodationOneTimeEvent(shopId: $shopId, input: $input) {
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
      ... on AccommodationOneTimeEvent {
        startDate
      }
    }
  }
`;

export const useCreateAccommodationOneTimeEvent = () => {
  const [mutate, { data, loading, error }] = useMutation<
    ICreateAccommodationOneTimeEventsRes,
    ICreateAccommodationOneTimeEventVars
  >(CREATE_ACCOMMODATION_ONE_TIME_EVENT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          accommodationEvents(exisingItems = []) {
            const newItemRef = cache.writeFragment({
              data: data?.createAccommodationOneTimeEvent,
              fragment: gql`
                fragment OneTimeEventFields on AccommodationEvent {
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

                  ... on AccommodationOneTimeEvent {
                    startDate
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
