import { gql, useMutation } from '@apollo/client';

import { MENU_ITEM_FIELDS } from 'src/graphql/fragments/menuItem';
import { MultiLanguageField } from 'src/shared/interfaces';
import { IMenuItem } from 'src/shared/interfaces/MenuItem';

export interface IEditMenuItem {
  name: MultiLanguageField[];
  order: number;
  linkedPages: ILinkedPage;
}

export interface ILinkedPage {
  activities: string[];
  news: string[];
  customPages: string[];
}

export interface IEditMenuItemVars {
  shopId?: string;
  id: string;
  menuItem: Partial<IEditMenuItem>;
}

export interface IEditMenuItemRes {
  editMenuItem: IMenuItem;
}

export const EDIT_MENU_ITEM = gql`
  mutation EditMenuItem($menuItem: UpdateMenuItemInput!, $shopId: ObjectId!, $id: ObjectId!) {
    editMenuItem(menuItem: $menuItem, shopId: $shopId, id: $id) {
      ...MenuItemFields
    }
  }
  ${MENU_ITEM_FIELDS}
`;

export const useEditMenuItem = () => {
  const [mutate, { data, error }] = useMutation<IEditMenuItemRes, IEditMenuItemVars>(EDIT_MENU_ITEM, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          menuItems(exisingItems = []) {
            cache.writeFragment({
              id: data?.editMenuItem.id,
              data: data?.editMenuItem,
              fragment: MENU_ITEM_FIELDS,
            });

            return exisingItems;
          },
        },
      });
    },
  });
  return { mutate, data, error };
};
