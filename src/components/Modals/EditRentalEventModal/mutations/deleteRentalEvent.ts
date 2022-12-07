import { gql, useMutation } from '@apollo/client';

import { eventTypeToString } from 'src/helpers';
import { EventType } from 'src/shared/enums';

export interface IDeleteRentalEventVars {
  shopId?: string;
  input: { id: string };
}

export interface IDeleteRentalEventRes {
  deleteRentalEvent: string;
}

export const DELETE_RENTAL_EVENT = gql`
  mutation DeleteRentalEvent($input: DeleteRentalEventDto!, $shopId: ObjectId!) {
    deleteRentalEvent(shopId: $shopId, input: $input)
  }
`;

export const useDeleteRentalEvent = (eventType: EventType) => {
  const [mutate, { data, error }] = useMutation<IDeleteRentalEventRes, IDeleteRentalEventVars>(DELETE_RENTAL_EVENT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          rentalEvents(exisingItems: { __ref: string }[] = []) {
            const evictProps = {
              id: data?.deleteRentalEvent,
              __typename: `Rental${eventTypeToString(eventType)}Event`,
            };
            const item = cache.identify(evictProps);

            return exisingItems.filter(({ __ref }) => __ref !== item);
          },
        },
      });
    },
  });
  return { mutate, data, error };
};
