import { gql, useMutation } from '@apollo/client';

export type IRemoveResourceRes = {
  removeResource: string | null;
};

export interface IRemoveResourceVars {
  shopId?: string;
  id: string;
}

export const REMOVE_RESOURCE = gql`
  mutation RemoveResource($shopId: ObjectId!, $id: ObjectId!) {
    removeResource(shopId: $shopId, id: $id)
  }
`;

export const useRemoveResource = () => {
  const [mutate, { data, loading, error }] = useMutation<IRemoveResourceRes, IRemoveResourceVars>(REMOVE_RESOURCE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          resources(exisingItems: { __ref: string }[] = []) {
            const item = cache.identify({ __ref: `Resource:${data?.removeResource}` });
            return exisingItems.filter(({ __ref }) => __ref !== item);
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
};
