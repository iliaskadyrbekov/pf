import { gql, useMutation } from '@apollo/client';

export interface IChangeAccommodationOrderItemResourceVars {
  shopId?: string;
  input: {
    id: string;
    resourceId: string;
  };
}

export interface IChangeAccommodationOrderItemResourceRes {
  changeAccommodationOrderItemResource: { id: string; resource: string };
}

export const CHANGE_ACCOMMODATION_ORDER_ITEM_RESOURCE = gql`
  mutation ChangeAccommodationOrderItemResource(
    $input: ChangeAccommodationOrderItemResourceInput!
    $shopId: ObjectId!
  ) {
    changeAccommodationOrderItemResource(input: $input, shopId: $shopId) {
      id

      resource {
        id
        name {
          lang
          value
          country
        }
        group {
          name
          id
        }
      }
    }
  }
`;

export const useChangeAccommodationOrderItemResource = () => {
  const [mutate, { data, error }] = useMutation<
    IChangeAccommodationOrderItemResourceRes,
    IChangeAccommodationOrderItemResourceVars
  >(CHANGE_ACCOMMODATION_ORDER_ITEM_RESOURCE, {
    update(cache, { data }) {
      cache.modify({
        id: data?.changeAccommodationOrderItemResource.id,
        fields: {
          resource() {
            return data?.changeAccommodationOrderItemResource.resource;
          },
        },
      });
    },
  });
  return { mutate, data, error };
};
