import { gql, useMutation } from '@apollo/client';

import { EventType } from 'src/shared/enums';
import { eventTypeToString } from 'src/helpers';

export interface IDeleteAccommodationEventVars {
  shopId?: string;
  input: { id: string };
}

export interface IDeleteAccommodationEventRes {
  deleteAccommodationEvent: string;
}

export const DELETE_ACCOMMODATION_EVENT = gql`
  mutation DeleteAccommodationEvent($input: DeleteAccommodationEventInput!, $shopId: ObjectId!) {
    deleteAccommodationEvent(shopId: $shopId, input: $input)
  }
`;

export const useDeleteAccommodationEvent = (eventType: EventType) => {
  const [mutate, { data, error }] = useMutation<IDeleteAccommodationEventRes, IDeleteAccommodationEventVars>(
    DELETE_ACCOMMODATION_EVENT,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            accommodationEvents(exisingItems: { __ref: string }[] = []) {
              const evictProps = {
                id: data?.deleteAccommodationEvent,
                __typename: `Accommodation${eventTypeToString(eventType)}Event`,
              };
              const item = cache.identify(evictProps);

              return exisingItems.filter(({ __ref }) => __ref !== item);
            },
          },
        });
      },
    },
  );
  return { mutate, data, error };
};
