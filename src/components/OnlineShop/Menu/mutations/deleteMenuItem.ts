import { gql, useMutation } from '@apollo/client';

export interface IDeleteMenuItemVars {
  shopId?: string;
  id: string;
}

export interface IDeleteMenuItemRes {
  deleteMenuItem: string;
}

export const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($id: ObjectId!, $shopId: ObjectId!) {
    deleteMenuItem(shopId: $shopId, id: $id)
  }
`;

export const useDeleteMenuItem = () => {
  const [mutate, { data, error }] = useMutation<IDeleteMenuItemRes, IDeleteMenuItemVars>(DELETE_MENU_ITEM, {
    update(cache, { data }) {
      if (data) {
        cache.evict({ id: `MenuItem:${data.deleteMenuItem}` });
      }
    },
  });
  return { mutate, data, error };
};
