import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { IMenuItem } from 'src/shared/interfaces/MenuItem';

export interface IReorderMenuItemsRes {
  reorderMenuItems: IMenuItem[];
}

export interface IReorderMenuItemsVars {
  shopId?: string;
  input: {
    id: string;
    order: number;
  }[];
}

export const REORDER_MENU_ITEMS = gql`
  mutation ReorderMenuItems($shopId: ObjectId!, $input: [ReorderMenuItemsInput!]!) {
    reorderMenuItems(shopId: $shopId, input: $input) {
      order
      id
    }
  }
`;

export const useReorderMenuItems = () => {
  const [mutate, { data, loading, error }] = useMutation<IReorderMenuItemsRes, IReorderMenuItemsVars>(
    REORDER_MENU_ITEMS,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            menuItems() {
              const newItemsRef = data?.reorderMenuItems.map((act) =>
                cache.writeFragment({
                  data: act,
                  fragment: gql`
                    fragment MenuItemFields on MenuItem {
                      order
                    }
                  `,
                }),
              );

              return newItemsRef;
            },
          },
        });
      },
    },
  );

  return { mutate, data, loading, error };
};
