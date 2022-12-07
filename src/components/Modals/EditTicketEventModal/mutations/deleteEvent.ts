import { gql, useMutation } from '@apollo/client';

export interface IDeleteEventVars {
  shopId?: string;
  input: { id: string };
}

export interface IDeleteEventRes {
  deleteEvent: string;
}

export const DELETE_EVENT = gql`
  mutation DeleteEvent($input: DeleteEventDto!, $shopId: ObjectId!) {
    deleteEvent(shopId: $shopId, input: $input)
  }
`;

export const useDeleteEvent = () => {
  const [mutate, { data, error }] = useMutation<IDeleteEventRes, IDeleteEventVars>(DELETE_EVENT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          events(exisingItems: { __ref: string }[] = []) {
            const evictProps = { event: { id: data?.deleteEvent }, __typename: 'Event' };
            const item = cache.identify(evictProps);
            return exisingItems.filter(({ __ref }) => __ref !== item);
          },
        },
      });
    },
  });
  return { mutate, data, error };
};
